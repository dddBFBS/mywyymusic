<template>
  <div class="login">
    <div class="loginTop">欢迎登陆</div>
    <div class="loginContent">
      <input type="text" name="email" class="email" placeholder="请输入邮箱" v-model="email">
      <input type="password" name="password" class="password" placeholder="请输入密码" v-model="password">
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/request/api/home.js';
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    //这里也需要是异步操作，等待结果的返回，返回处理完成后的结果
    Login: async function () {
      let res = await this.$store.dispatch('getLogin', { email: this.email, password: this.password })
      console.log(res);
      //登陆成功，跳转个人中心页面
      if (res.data.code === 200) {
        this.$store.commit('updateIsLogin', true);
        this.$store.commit('updateToken', res.data.token);
        let result = await getUserInfo(res.data.account.id);
        this.$store.commit('updateUserInfo', result);
        this.$router.push('/infouser');
      } else {
        alert("账号或密码错误，请重试");
        this.email = '';
        this.password = '';
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #c28787;

  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }

  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;

    .email,
    .password {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }

    .btn {
      width: 2rem;
      height: .6rem;
    }
  }
}
</style>