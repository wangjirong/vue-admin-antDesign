<template>
  <div class="login cover fixed">
    <video
      class="video-source cover fixed"
      width="100vw"
      height="100vh"
      src="https://erics-bucket.oss-cn-beijing.aliyuncs.com/admin/index_cover/video/Miko%20fox%20(Ver.1.2).mp4"
      autoplay="autoplay"
      loop="loop"
    ></video>
    <div class="login-area flex-column-center">
      <h3 class="title">用户登录</h3>
      <a-input
        ref="userNameInput"
        v-model="admin.userName"
        placeholder="用户名"
        style="margin: 10px 0"
      >
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input-password placeholder="密码" v-model="admin.password">
        <a-icon slot="prefix" type="lock"></a-icon>
      </a-input-password>
      <a-button
        type="primary"
        block
        style="margin: 10px 0"
        @click.native="login"
      >
        登录
      </a-button>
      <a-button type="danger" block @click.native="toRegister">
        注册
      </a-button>
    </div>
  </div>
</template>
<script>
import JwtDecode from "jwt-decode";
export default {
  data() {
    return {
      admin: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (!this.admin.userName) this.$message.error("用户名不能为空！");
      else if (!this.admin.password) this.$message.error("密码不能为空！");
      else {
        const { data } = await this.$axios.post("/admin/login", this.admin);
        if (!data) this.$message.error("账号或密码错误");
        else {
          sessionStorage.setItem("token", data);
          this.$message.success("登录成功");
          const user = JwtDecode(data);
          this.$store.dispatch("SetAdmin", user);
          this.$router.push("/blog");
        }
      }
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="less">
.login {
  position: relative;

  .video-source {
    object-fit: fill;
  }

  .login-area {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    height: 300px;
    padding: 2em;
    border-radius: 10px;
    background-color: rgba(222, 222, 222, 0.1);

    .title {
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
