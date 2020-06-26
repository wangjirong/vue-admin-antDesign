const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      width: 100,
      align: "center"
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      width: 60,
      align: "center"
    },
    {
      title: "是否原创",
      dataIndex: "delivery",
      key: "delivery",
      width: 60,
      align: "center"
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag",
      width: 100,
      align: "center"
    },
    {
      title: "更新时间",
      dataIndex: "time",
      key: "time",
      width: 100,
      align: "center"
    },
    // {
    //   title: "评论数量",
    //   dataIndex: "commentCount",
    //   key: "commentCount",
    //   width: 60,
    //   align: "center"
    // },
    {
      title: "概述",
      dataIndex: "desc",
      key: "desc",
      width: 200,
      align: "center"
    },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 100,
      scopedSlots: { customRender: "action" },
      align: "center"
    }
  ]

  export default columns