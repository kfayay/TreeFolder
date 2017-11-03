<template>
  <div id="app">
    <header class="app__title">调整直属成员</header>
    <div class="department__container">
      <div class="department-tree__wrapper">
        <div class="department-tree__search-wrapper">
          <span class="iconfont icon-search"></span>
          <div class="search__content">
            <input type="text" placeholder="姓名/昵称/手机／邮箱">
          </div>
        </div>
        <div class="department-tree__content">
          <department-tree :tree="department" :root="true"></department-tree>
        </div>
      </div>
      <div class="employee__wrapper">
        <p class="employee__title">直属成员</p>
        <ul class="employee__list">
          <li class="employee__item" v-for="(item, index) of employee">{{item.nickname}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import DepartmentTree from '@/components/DepartmentTree'
  import {getDepartmentList} from '@/databus'

  function DeparementTreeTraversal (tree, employeeList = []) {
    let _member = tree.member || []
    let _node = tree.node || []
    if (_member && _member.length > 0) {
      _member.forEach((item) => {
        let _userId = item.user_id
        if (~employeeList.indexOf(_userId)) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    }
    if (_node && _node.length > 0) {
      _node.forEach((item) => {
        DeparementTreeTraversal(item, employeeList)
      })
    }
  }

  function getEmployee (tree) {
    let _member = tree.member || []
    let _node = tree.node || []
    let _list = []
    if (_member.length > 0) {
      _list = _list.concat(_member.filter(item => item.selected))
    }
    if (_node.length > 0) {
      _list = _list.concat(getEmployee(_node))
    }
    return _list
  }

  export default {
    name: 'app',
    components: {
      DepartmentTree
    },
    data () {
      return {
        department: {},
        employeeList: []
      }
    },
    computed: {
      employee () {
        let _department = this.department
        if (!Object.keys(_department).length) return []
        return getEmployee(_department)
      }
    },
    created () {
      getDepartmentList().then(({data}) => {
        DeparementTreeTraversal(data, ['2511'])
        this.department = data
      })
    }
  }
</script>

<style>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  background: rgba(0, 0, 0, .2);
}
#app {
  margin-top: 200px;
  margin-left: 30px;
  border-radius: 8px;
  width: 600px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
}
.app__title {
  margin: 0;
  border-bottom: 1px solid #d9d9d9;
  padding-left: 20px;
  height: 48px;
  font-size: 13px;
  font-weight: bold;
  line-height: 48px;
}
.department__container {
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
}
.department-tree__wrapper {
  flex: 1;
  border-right: 1px solid #d9d9d9;
}
.employee__wrapper {
  flex: 1;
}
.department-tree__search-wrapper {
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  height: 48px;
  align-items: center;
}
.department-tree__content {
  padding: 10px;
}
.search__content {
  overflow: hidden;
  flex: 1;
}
.search__content input {
  border: none;
  height: 100%;
  width: 100%;
  font-size: 15px;
}
.employee__title {
  margin: 0;
  border-bottom: 1px solid #d9d9d9;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #848484;
}
</style>
