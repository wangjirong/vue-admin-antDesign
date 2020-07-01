<template>
  <div class="link-list">
    <a-table
      :columns="columns"
      :data-source="linkList"
      :scroll="{ x: '100%', y: '100%' }"
      rowKey="_id"
    >
      <span slot="action" slot-scope="record" class="flex-vertical-center">
        <a-popconfirm
          title="确定删除该链接吗?"
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
import columns from "../../config/LinkList";
export default {
  inject: ["reload"],
  data() {
    return {
      columns,
      linkList: [],
    };
  },
  methods: {
    async getAllLinks() {
      const { data } = await this.$axios.get("/link/getAllLinks");
      return data;
    },
    async confirm(e) {
      const { status } = await this.$axios.get(`/link/deleteLink?_id=${e._id}`);
      if (status === 200) this.$Message.success("删除成功");
      else this.$Message.error("删除失败");
      this.reload();
    },
    cancel() {},
  },
  async created() {
    this.linkList = await this.getAllLinks();
  },
};
</script>

<style></style>
