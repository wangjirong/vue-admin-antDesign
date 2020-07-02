<template>
  <div class="add-diary">
    <div class="content">
      <h3 class="title">写日志</h3>
      <a-textarea
        placeholder="请输入某些东西……"
        :rows="4"
        v-model="diary.text"
        style="marginBottom:2em"
      />
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="http://jsonplaceholder.typicode.com/posts/"
        :customRequest="upload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="封面" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>

      <a-button type="primary" @click="submit">
        提交
      </a-button>
    </div>
  </div>
</template>
<script>
import { getBase64 } from "../../service/getBase64";
export default {
  data() {
    return {
      imageUrl: "",
      loading: false,
      diary: {
        text: "",
        file: {},
      },
    };
  },
  methods: {
    handleChange(info) {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    },
    upload({ file }) {
      this.diary.file = file;
    },
    async submit() {
      let diary = new FormData();
      diary.append("file", this.diary.file);
      diary.append("text", this.diary.text);

      const { status } = await this.$axios.post("/diary/addDiary",diary);
      if (status === 200) this.$message.success("提交成功");
      else this.$message.error("提交失败");
    },
  },
};
</script>

<style lang="less" scoped>
.add-diary {
  .content {
    width: 60%;
    margin: 100px auto;
    background-color: rgba(255, 255, 255, 1);
    padding: 2em;
    .title {
      text-align: center;
      font-size: 2em;
      font-family: "Times New Roman", Times, serif;
    }
  }
}
</style>
