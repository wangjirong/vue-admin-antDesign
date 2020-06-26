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

import { formBlogList } from "../../service/blog.formdata";
import columns from '../../config/blogList'
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