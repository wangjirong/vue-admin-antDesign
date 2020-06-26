<template>
  <div class="tags-list">
    <a-input-search
      placeholder="请输入标签名"
      enter-button="增加标签"
      @search="addTag"
    />
    <a-table
      :columns="columns"
      :data-source="tagsList"
      :scroll="{ x: '100%', y: '100%' }"
      rowKey="_id"
    >
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
import columns from "../../config/tagList";
export default {
  inject: ["reload"],
  data() {
    return {
      tagsList: [],
      columns,
      showModal: false,
    };
  },
  methods: {
    async getAllTags() {
      const { data } = await this.$axios.get("/tag/getAllTags");
      return data;
    },
    async confirm(tag) {
      const { status } = await this.$axios.get(
        `/tag/deleteTag?_id=${tag._id}&tagName=${tag.tagName}`
      );
      if (status === 200) this.$message.success(`成功删除标签${tag.tagName}`);
      else this.$message.error(`删除标签${tag.tagName}失败`);
      this.reload();
    },
    cancel() {},
    async addTag(tagName) {
      for (let tag of this.tagsList) {
        if (tag.tagName === tagName) {
          this.$message.info("该标签已存在，请重新输入！");
          return;
        }
      }
      const { status } = await this.$axios.get(
        `/tag/addTag?tagName=${tagName}`
      );
      if (status === 200) this.$message.success(`成功添加标签${tagName}`);
      else this.$message.error(`添加标签${tagName}失败`);

      this.reload();
    },
  },
  async created() {
    this.tagsList = await this.getAllTags();
  },
};
</script>

<style lang="less" scoped></style>
