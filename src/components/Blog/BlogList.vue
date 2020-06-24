<template>
  <div class="blog-list">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: '100%', y: '100%' }" rowKey="_id" >
      <span slot="action" slot-scope="record" class="flex-vertical-center">
        <a-popconfirm
          title="确定删除该文章吗?"
          placement="leftTop"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(record)"
          @cancel="cancel"
        >
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
        <a-button type="primary" style="marginLeft:10px">编辑</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
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
    width: 100,
    align: "center"
  },
  {
    title: "是否原创",
    dataIndex: "delivery",
    key: "delivery",
    width: 100,
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
  {
    title: "评论数量",
    dataIndex: "commentCount",
    key: "commentCount",
    width: 100,
    align: "center"
  },
  {
    title: "概述",
    dataIndex: "desc",
    key: "desc",
    width: 150,
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
];
import { formBlogList } from "../../service/blog.formdata";
export default {
    inject:['reload'],
  data() {
    return {
      data:[],
      columns
    };
  },
  methods: {
    async getAllBlog() {
      const res = await this.$axios.get("/blog/getAllBlogs");
      if (res.status === 200) return formBlogList(res.data);
    },
    async confirm({_id,cover}) {
        console.log(cover);
        
        const res = await this.$axios.post('/blog/deleteBlog/'+_id,{cover})
        if(res.status === 200)this.$message.success("删除成功")
        else this.$message.error("删除失败")
        this.reload();
        
    },
    cancel() {}
  },
  async created() {
    this.data = await this.getAllBlog();
    console.log(this.data);
    
  }
};
</script>

<style lang="less" scoped>
.blog-list {
  padding: 2em 0 0 2em;
}
</style>