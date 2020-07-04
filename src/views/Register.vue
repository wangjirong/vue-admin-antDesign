<template>
  <div class="register">
    <a-form class="form" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your userName!',
                  whitespace: true,
                },
              ],
            },
          ]"
          placeholder="userName"
        >
          <a-icon slot="prefix" type="user"
        /></a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        >
          <a-icon slot="prefix" type="lock"
        /></a-input-password>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-input-password
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        >
          <a-icon slot="prefix" type="lock"
        /></a-input-password>
      </a-form-item>

      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            },
          ]"
          placeholder="email"
        >
          <a-icon slot="prefix" type="mail"
        /></a-input>
      </a-form-item>

      <a-form-item v-bind="formItemLayout">
        <a-input
          placeholder="手机号码"
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: 'Please input your phone number!' },
              ],
            },
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '86' }]"
            style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
          <a-icon slot="prefix" type="phone" />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              placeholder="验证码"
              v-decorator="[
                'verticode',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the verticode!',
                    },
                  ],
                },
              ]"
            >
              <a-icon slot="prefix" type="code"
            /></a-input>
          </a-col>
          <a-col :span="12">
            <a-button v-if="!isCode" @click.native="getVerticode" type="primary"
              >获取验证码</a-button
            >
            <a-button v-if="isCode" type="danger">{{ seconds }}</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'invitationCode',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your invitationCode!',
                  whitespace: true,
                },
              ],
            },
          ]"
          placeholder="邀请码"
        >
          <a-icon slot="prefix" type="transaction" />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" style="width:100%">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCode: false,
      seconds: 60,
      code: "",
      admin: {
        userName: "",
        password: "",
        email: "",
        phone: "",
        invitationCode: "",
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24,
            offset: 0,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const {
            userName,
            password,
            email,
            phone,
            verticode,
            invitationCode,
          } = values;
          if (verticode !== this.code) this.$message.error("验证码不正确！");
          else {
            const { status, data } = await this.$axios.post("/admin/register", {
              userName,
              password,
              email,
              phone,
              invitationCode,
            });
            if (status === 200) {
              this.$message.success("注册成功！返回登录界面！");
              this.$router.push('/login')

            } else if (data.code === 211) this.$message.error("该账号已存在！");
            else if (data.code === 233) this.$message.error("邀请码错误！");
            else this.$message.error("注册失败");
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    async getVerticode() {
      this.isCode = true;
      const sec = (this.seconds = 45);
      let time = setInterval(() => {
        if (--this.seconds === 0) {
          clearInterval(time);
          this.isCode = false;
        }
      }, 1000);

      const email = this.form.getFieldValue("email");
      const { data } = await this.$axios.post("admin/getVerificationCode", {
        email,
      });
      this.code = data;
      this.$message.info("该验证码60秒内有效！");
      setTimeout(() => {
        this.code = "";
      }, 36000);
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-image: url("https://iri-blog.oss-cn-beijing.aliyuncs.com/admin/registerBG.jpg");
  background-size: 100% 100%;
  background-position: center center;
  background-attachment: fixed;
  padding: 15vh 34vw;
  .form {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2em 4em;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
