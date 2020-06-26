const columns = [{
        title: "id",
        dataIndex: "_id",
        key: "_id",
        width: 60,
        align: "center"
    }, {
        title: "标签名",
        dataIndex: "tagName",
        key: "tagName",
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