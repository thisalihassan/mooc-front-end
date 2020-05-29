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
import { GetSubscription, getmyCourse } from "../../redux/actions";
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
      totalPage: 12,
      perPage: 6,
      course: null,
      id: null
    };
  }

  async componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      await axios
        .post(URL + "api/Courses/getanouncement/" + values.id, {}, config)
        .then(res => {
          this.setState({
            id: res.data.anouncement[0]._id,
            description: res.data.anouncement[0].description,
            course: { label: res.data.course.name, value: res.data.course._id }
          });
          this.toggleModal();
        });
    }
  }

  onChangePage(page) {
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.dataListRender();
      }
    );
  }

  async dataListRender(search) {
    const currentPage = this.state.currentPage;
    const perPage = this.state.perPage;
    if (this.props.user.roll === "student") {
      const course = this.state.listCourse;
      const roll = this.props.user.roll;

      const body = JSON.stringify({ currentPage, course, perPage, roll });
      await axios
        .post(URL + "api/Courses/getanounce", body, config)
        .then(res => {
          this.setState({
            firstRun: false,
            anouncements: res.data.anounce,
            totalPage: res.data.totalPage / this.state.perPage
          });
        });
    }

    if (this.props.user.roll === "teacher") {
      const roll = this.props.user.roll;
      const body = JSON.stringify({ currentPage, perPage, roll });
      await axios
        .post(URL + "api/Courses/getanounce", body, config)
        .then(res => {
          this.setState({
            firstRun: false,
            anouncements: res.data.anounce,
            totalPage: res.data.totalPage / this.state.perPage
          });
        });
    }
  }

  async componentDidUpdate() {
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
      modalOpen: !this.state.modalOpen
    });
  };
  reloadModel() {
    this.props.history.push("/app/myportal/anouncements");
    window.location.reload();
  }

  async deleteAnouncement(id) {
    await axios
      .get(URL + "api/Courses/remove/" + id, {}, config)
      .then(this.props.history.push("/app/myportal/anouncements"));
    window.location.reload();
  }

  render() {
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
                        color="primary"
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
              {this.state.anouncements.map((item, index) => {
                const name = item.course.name;
                return item.anouncement.map((n, k) => {
                  return (
                    <TodoListItem
                      key={`todo_item_${n._id}`}
                      item={n}
                      name={name}
                      roll={this.props.user.roll}
                      deleteClick={id => {
                        this.deleteAnouncement(id);
                      }}
                    />
                  );
                });
              })}
            </Row>
          </Colxx>
          <Pagination
            currentPage={this.state.currentPage}
            totalPage={this.state.totalPage}
            onChangePage={i => this.onChangePage(i)}
          />
        </Row>
        {this.props.user && this.props.user.roll === "teacher" ? (
          <div>
            <TodoApplicationMenu courses={this.props.myCourses} />
            <AddNewTodoModal
              reloadModel={this.reloadModel}
              id={this.state.id}
              description={this.state.description}
              course={this.state.course}
              reloadModel={e => this.reloadModel(e)}
              toggleModal={this.toggleModal}
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
    todoApp
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    GetSubscription,
    getmyCourse
  })(TodoApp)
);
