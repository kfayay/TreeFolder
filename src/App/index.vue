<template>
  <div id="app">
    <header class="app__title">调整直属成员</header>
    <div class="app__content">
      <div class="app__body">
        <header class="body__header department__header">
          <span class="iconfont icon-search"></span>
          <div class="search__wrapper">
            <input type="text" placeholder="姓名/手机/昵称/邮箱">
          </div>
        </header>
        <div class="body__content department__content">
          <department-tree :tree="department" :root="true"></department-tree>
        </div>
      </div>
      <div class="app__body">
        <header class="body__header employee__header">直属成员数</header>
        <div class="body__content"></div>
      </div>
    </div>
    <footer class="app__footer">
      <button class="app__footer-btn">确定</button>
      <button class="app__footer-btn">取消</button>
    </footer>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
<script>
  import DepartmentTree from '@/components/DepartmentTree'
  import {getDepartmentList} from '@/databus'
  export default {
    data () {
      return {
        department: {},
        employeeList: []
      }
    },
    components: {
      DepartmentTree
    },
    created () {
      getDepartmentList().then(({data}) => {
        this.department = data
        console.log(data)
      })
    }
  }
</script>