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
        <a-checkbox-group v-model="form.tags">
          <a-checkbox value="HTML5" name="tags">HTML5</a-checkbox>
          <a-checkbox value="CSS3" name="tags">CSS3</a-checkbox>
          <a-checkbox value="JavaScript" name="tags">JavaScript</a-checkbox>
          <a-checkbox value="ES6" name="tags">ES6</a-checkbox>
          <a-checkbox value="Vuejs" name="tags">Vuejs</a-checkbox>
          <a-checkbox value="Nodejs" name="tags">Nodejs</a-checkbox>
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
export default {
    inject:['reload'],
  data() {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
      other: "",
      form: {
        title: "",
        desc: "",
        delivery: true,
        tags: [],
        context: ""
      },
      cover_img: "",
      loading: false,
      imageUrl: "",
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 15, message: "字数最小为5，最大为15", trigger: "blur" }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "请选择至少一个标签",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请输入文章概述", trigger: "blur" }],
        context: [
          { required: true, message: "文章内容不能为空", trigger: "save" }
        ]
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const { form, cover_img } = this;
          const blog = new FormData();
          blog.append("info", JSON.stringify(form));
          blog.append("file", cover_img);
          const res = await this.$axios.post("/blog/addBlog", blog);
          if(res.status === 200)
          {
              this.$message.success("上传成功")
              this.reload();
          }else this.$message.error("上传失败")

        } else {
          return false;
        }
      });
    },
    onReset() {
      this.$refs.ruleForm.resetFields();
    },
     handleChange(info) {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
    },
    async upload({ file }) {
      this.cover_img = file;
    }
  }
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
