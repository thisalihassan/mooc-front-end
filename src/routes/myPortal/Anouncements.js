import React, { Component, Fragment } from "react";
import { Row, Button } from "reactstrap";
import "./table.css";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Colxx, Separator } from "../../components/CustomBootstrap";
import TodoListItem from "../../components/ApplicationMenu/TodoListItem";
import AddNewTodoModal from "../../containers/applicationTodo/AddNewTodoModal";
import Pagination from "../../components/pages/Pagination";
import TodoApplicationMenu from "../../containers/applicationTodo/TodoApplicationMenu";
import {
  GetSubscription,
  getmyCourse,
  makeAnouncement,
} from "../../redux/actions";
import axios from "axios";
import queryString from "query-string";
import { URL, config } from "../../constants/defaultValues";
class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      lastChecked: null,
      listCourse: [],
      anouncements: [],
      description: null,
      firstRun: true,
      currentPage: 1,
      totalPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
      course: null,
      id: null,
    };
  }

  async componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
    }
  }

  onChangePage(page) {
    const start = page * (page + 1);
    const div = start / 6;
    this.setState(
      {
        currentPage: page,
        start:
          page === 1 ? 0 : start - (start / 6 === 1 ? 0 : Math.round(div) - 1),
        end: page === 1 ? 6 : start + 7,
      },
      () => {
        this.dataListRender();
      }
    );
  }

  async dataListRender() {
    const currentPage = this.state.currentPage;
    const perPage = this.state.perPage;
    if (this.props.user.roll === "student") {
      const course = this.state.listCourse;
      const roll = this.props.user.roll;

      const body = JSON.stringify({ currentPage, course, perPage, roll });
      this.props.makeAnouncement(body);
    }

    if (this.props.user.roll === "teacher") {
      const roll = this.props.user.roll;
      const body = JSON.stringify({ currentPage, perPage, roll });
      this.props.makeAnouncement(body);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.todoApp.todoItems !== this.props.todoApp.todoItems) {
      const data = this.props.todoApp.todoItems;
      console.log(data);
      this.setState({
        firstRun: false,
        totalPage: data.length / this.state.perPage,
      });
    }
    if (this.props.user && this.state.firstRun) {
      if (this.props.courses) {
        this.makecoursesList();
        this.dataListRender();
      }
      this.dataListRender();
    }
  }
  makecoursesList() {
    for (const key of Object.keys(this.props.courses)) {
      this.state.listCourse[key] = this.props.courses[key]._id;
    }
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  clearModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
    this.setState({
      course: null,
      id: null,
      description: null,
    });
  };
  reloadModel() {
    this.makecoursesList();
    this.dataListRender();
  }
  async updateAnouncement(id) {
    await axios
      .post(URL + "api/Courses/getanouncement/" + id, {}, config)
      .then((res) => {
        console.log(res.data.anouncement[0].description);
        this.setState({
          id: res.data.anouncement[0]._id,
          description: res.data.anouncement[0].description,
          course: { label: res.data.course.name, value: res.data.course._id },
        });
        this.toggleModal();
      });
  }
  async deleteAnouncement(id) {
    await axios.get(URL + "api/Courses/remove/" + id, {}, config);
    this.makecoursesList();
    this.dataListRender();
  }

  render() {
    const { start, end, currentPage } = this.state;
    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <table>
              <tr>
                <td>
                  <div className="announcement">
                    <h2>
                      <IntlMessages id="menu.NotificationCenter" />
                    </h2>
                  </div>
                </td>

                <td>
                  {this.props.user && this.props.user.roll === "teacher" && (
                    <div className="float-sm-right">
                      <Button
                        size="lg"
                        float="right"
                        onClick={this.toggleModal}
                      >
                        <IntlMessages id="announcement.add-new" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            </table>

            <div className="mb-2"></div>
            <Separator className="mb-5" />
            <Row>
              {this.props.todoApp.todoItems ? (
                this.props.todoApp.todoItems.slice(start, end).map((item) => {
                  const name = item.course.name;
                  return item.anouncement.map((n, k) => {
                    return (
                      <TodoListItem
                        key={`todo_item_${n._id}`}
                        item={n}
                        name={name}
                        roll={this.props.user.roll}
                        deleteClick={(id) => {
                          this.deleteAnouncement(id);
                        }}
                        updateAnouncement={(id) => {
                          this.updateAnouncement(id);
                        }}
                      />
                    );
                  });
                })
              ) : (
                <div className="loading"></div>
              )}
            </Row>
          </Colxx>
          {this.props.todoApp.todoItems && (
            <Pagination
              currentPage={currentPage}
              totalPage={this.props.todoApp.todoItems.length / 6}
              onChangePage={(i) => this.onChangePage(i)}
            />
          )}
        </Row>
        {this.props.user && this.props.user.roll === "teacher" ? (
          <div>
            <TodoApplicationMenu courses={this.props.myCourses} />
            <AddNewTodoModal
              reloadModel={this.reloadModel}
              id={this.state.id}
              description={this.state.description}
              course={this.state.course}
              reloadModel={(e) => this.reloadModel(e)}
              toggleModal={this.clearModal}
              modalOpen={modalOpen}
              courses={this.props.myCourses}
            />
          </div>
        ) : (
          this.props.courses && (
            <TodoApplicationMenu courses={this.props.courses} />
          )
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ todoApp, auth, course, subscribtion }) => {
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  const { myCourses } = course;
  return {
    user,
    courses,
    myCourses,
    todoApp,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    GetSubscription,
    makeAnouncement,
    getmyCourse,
  })(TodoApp)
);
