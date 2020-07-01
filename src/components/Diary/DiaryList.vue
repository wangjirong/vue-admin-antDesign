<template>
  <div class="diary-list">
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
import columns from "../../config/diaryList";
import { formDate } from "../../service/diary.formdata";
export default {
  inject: ["reload"],
  data() {
    return {
      columns,
      linkList: [],
    };
  },
  methods: {
    async getAllDiary() {
      const { data } = await this.$axios.get("/diary/getAllDiary");
      return (this.linkList = formDate(data));
    },
    async confirm(e) {
      console.log(e);
      const { status } = await this.$axios.post(
        `/diary/deleteDiary/${e._id}`,
        e
      );
      if (status === 200) this.$message.success("删除成功");
      else this.$message.error("删除失败");
      this.reload();
    },
    cancel() {},
  },
  created() {
    this.getAllDiary();
  },
};
</script>

<style></style>
