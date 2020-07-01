const columns = [{
        title: "名称",
        dataIndex: "title",
        key: "title",
        width: 60,
        align: "center"
    }, {
        title: "网址",
        dataIndex: "href",
        key: "href",
        width: 100,
        align: "center"
    },
    {
        title: "图标",
        dataIndex: "logo",
        key: "logo",
        width: 100,
        align: "center"
    },
    {
        title: "描述",
        dataIndex: "desc",
        key: "desc",
        width: 100,
        align: "center"
    },

    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 100,
        scopedSlots: {
            customRender: "action"
        },
        align: "center"
    }
]

export default columns