const columns = [{
        title: "id",
        dataIndex: "_id",
        key: "_id",
        width: 60,
        align: "center"
    },
    {
        title: "上传时间",
        dataIndex: "date",
        key: "date",
        width: 100,
        align: "center"
    }, {
        title: "内容",
        dataIndex: "text",
        key: "text",
        width: 100,
        align: "center"
    },
    {
        title: "图片地址",
        dataIndex: "cover",
        key: "cover",
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