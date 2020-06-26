<template>
  <div class="add-blog">
    <a-button-group>
      <a-button type="primary" @click="onSubmit">提交</a-button>
      <a-button type="danger" @click="onReset">清空</a-button>
    </a-button-group>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="title" label="文章标题" prop="title">
        <a-input
          v-model="form.title"
          @blur="
            () => {
              $refs.title.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="desc" label="文章概述" prop="desc">
        <a-input
          v-model="form.desc"
          type="textarea"
          @blur="
            () => {
              $refs.desc.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="文章封面">
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
            <div class="ant-upload-text">上传封面</div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="是否原创" prop="delivery">
        <a-switch v-model="form.delivery" />
      </a-form-model-item>
      <a-form-model-item label="文章标签" prop="tags">
        <a-checkbox-group v-model="form.tags" class="flex-vertical-center">
          <a-checkbox v-for="item in tagList" :key="item._id" :value="item.tagName" name="tags" style="margin:0.3em">{{item.tagName}}</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="md" prop="context">
        <mavon-editor
          :toolbars="toolbars"
          v-model="form.context"
          :ishljs="true"
          ref="md"
          :subfield="true"
          codeStyle="tomorrow-night"
          style="width: 100%"
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import toolbars from '../../config/mavon-editor'
export default {
  inject: ["reload"],
  data() {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
      other: "",
      toolbars,
      tagList:[],
      form: {
        title: "",
        desc: "",
        delivery: true,
        tags: [],
        context: "",
      },
      cover_img: "",
      loading: false,
      imageUrl: "",
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "字数最小为5，最大为15",
            trigger: "blur",
          },
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "请选择至少一个标签",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请输入文章概述", trigger: "blur" }],
        context: [
          { required: true, message: "文章内容不能为空", trigger: "save" },
        ],
      },

    };
  },
  methods: {
    async getAllTags() {
      const { data } = await this.$axios.get("/tag/getAllTags");
      return data;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { form, cover_img } = this;
          const blog = new FormData();
          blog.append("info", JSON.stringify(form));
          blog.append("file", cover_img);
          const res = await this.$axios.post("/blog/addBlog", blog);
          if (res.status === 200) {
            this.$message.success("上传成功");
            this.reload();
          } else this.$message.error("上传失败");
        } else {
          return false;
        }
      });
    },
    onReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(info) {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    },
    async upload({ file }) {
      this.cover_img = file;
    },
  },
  async created() {
    this.tagList = await this.getAllTags();
  },
};
</script>
<style lang="less">
.add-blog {
  padding: 2em;
}

.avatar-uploader > .ant-upload {
  width: 250px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
