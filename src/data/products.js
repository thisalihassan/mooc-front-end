const produtcs = [
  {
    id: 1,
    title: "Learn Artificial Intelligence As Beginner",
    img: "new6.jpg",
    category: "Articial Intelligence",
    createDate: "02.04.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 2,
    title: "Learn To be the best photographer",
    category: "Photography",
    img: "new2.png",
    createDate: "01.04.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 3,
    title: "Learn FLask API Python",
    img: "new1.png",
    category: "Python",
    createDate: "25.03.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 4,
    title: "Learn Machine Learning",
    img: "new2.png",
    category: "Cakes",
    createDate: "21.03.2018",
    status: "PROCESSED",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 5,
    title: "Learn PHP",
    category: "Web Development",
    img: "new3.jpg",
    createDate: "02.06.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 6,
    title: "Learn OOP",
    img: "new4.jpg",
    category: "Desserts",
    createDate: "14.07.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 7,
    title: "Learn Cooking: Cook Napoleonshat",
    img: "napoleonshat-thumb.jpg",
    category: "Cooking",
    createDate: "05.02.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 8,
    title: "Lets Cook Cheesecake!",
    img: "cheesecake-thumb.jpg",
    category: "Cooking",
    createDate: "18.08.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  },
  {
    id: 9,
    title: "Financier",
    img: "financier-thumb.jpg",
    category: "Cakes",
    createDate: "15.03.2018",
    status: "Active",

    description:
      "Absolutely no experience is required. We will start from the basics and gradually build up your knowledge. Everything is in the course."
  }
  // {
  //   id: 10,
  //   title: "Genoise",
  //   img: "/assets/img/genoise-thumb.jpg",
  //   category: "Cupcakes",
  //   createDate: "11.06.2018",
  //   status: "PROCESSED",
  //   statusColor: "secondary",
  //   description: "Christmas fruit cake, pudding on top",
  //   sales: 824,
  //   stock: 55
  // },
  // {
  //   id: 11,
  //   title: "Gingerbread",
  //   img: "/assets/img/gingerbread-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "10.04.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description: "Wedding cake decorated with donuts and wild berries",
  //   sales: 714,
  //   stock: 12
  // },
  // {
  //   id: 12,
  //   title: "Magdalena",
  //   img: "/assets/img/magdalena-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "22.07.2018",
  //   status: "PROCESSED",
  //   statusColor: "secondary",
  //   description: "Christmas fruit cake, pudding on top",
  //   sales: 702,
  //   stock: 14
  // },
  // {
  //   id: 13,
  //   title: "Parkin",
  //   img: "/assets/img/parkin-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "22.08.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description:
  //     "White chocolate strawberry yogurt cake decorated with fresh fruits and chocolate",
  //   sales: 689,
  //   stock: 78
  // },
  // {
  //   id: 14,
  //   title: "Streuselkuchen",
  //   img: "/assets/img/streuselkuchen-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "22.07.2018",
  //   status: "PROCESSED",
  //   statusColor: "secondary",
  //   description: "Delicious vegan chocolate cake",
  //   sales: 645,
  //   stock: 55
  // },
  // {
  //   id: 15,
  //   title: "Tea loaf",
  //   img: "/assets/img/tea-loaf-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "10.09.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description: "Cheesecake with fresh berries and mint for dessert",
  //   sales: 632,
  //   stock: 20
  // },
  // {
  //   id: 16,
  //   title: "Merveilleux",
  //   img: "/assets/img/merveilleux-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "18.02.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description: "Chocolate cake with mascarpone",
  //   sales: 621,
  //   stock: 6
  // },
  // {
  //   id: 17,
  //   title: "Fruitcake",
  //   img: "/assets/img/fruitcake-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "12.01.2019",
  //   status: "PROCESSED",
  //   statusColor: "secondary",
  //   description: "Chocolate cake with berries",
  //   sales: 595,
  //   stock: 17
  // },
  // {
  //   id: 18,
  //   title: "Bebinca",
  //   img: "/assets/img/bebinca-thumb.jpg",
  //   category: "Cakes",
  //   createDate: "04.02.2019",
  //   status: "PROCESSED",
  //   statusColor: "secondary",
  //   description: "Homemade cheesecake with fresh berries and mint",
  //   sales: 574,
  //   stock: 16
  // },
  // {
  //   id: 19,
  //   title: "Cremeschnitte",
  //   img: "/assets/img/cremeschnitte-thumb.jpg",
  //   category: "Desserts",
  //   createDate: "04.03.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description: "Cheesecake with chocolate cookies and Cream biscuits",
  //   sales: 562,
  //   stock: 9
  // },
  // {
  //   id: 20,
  //   title: "Soufflé",
  //   img: "/assets/img/souffle-thumb.jpg",
  //   category: "Cupcakes",
  //   createDate: "16.01.2018",
  //   status: "ON HOLD",
  //   statusColor: "primary",
  //   description: "Wedding cake with flowers Macarons and blueberries",
  //   sales: 524,
  //   stock: 14
  // }
];

export default produtcs;
