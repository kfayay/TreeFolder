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
          <department-tree :tree="department" :root="true" @toggle="toggle" :selected="employeeList"></department-tree>
        </div>
      </div>
      <div class="app__body">
        <header class="body__header employee__header">直属成员数 {{employee.length || ''}}</header>
        <div class="body__content">
          <ul class="employee__list" v-if="employee.length > 0">
            <li class="employee__item" v-for="item in employee">
              <figure class="employee__figure" :class="{'employee__figure--default': true}">
                <img src="#" alt="">
              </figure>
              <p class="employee__name">{{item.nickname + '(' + item.real_name + ')'}}</p>
              <span class="employee__btn-remove iconfont icon-remove" @click="remove(item.user_id)"></span>
            </li>
          </ul>
        </div>
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
  import {TreeFind} from '@/utils/tree'
  export default {
    data () {
      return {
        department: {},
        employeeList: ['2511']
      }
    },
    components: {
      DepartmentTree
    },
    methods: {
      toggle (list, type) {
        let _employeeSet = new Set(this.employeeList)
        if (type === 'remove') {
          list.forEach((item) => {
            _employeeSet.delete(item)
          })
        } else {
          list.forEach((item) => {
            _employeeSet.add(item)
          })
        }
        this.employeeList = Array.from(_employeeSet)
      },
      remove (id) {
        let _list = [id]
        this.toggle(_list, 'remove')
      }
    },
    computed: {
      employee () {
        let _tree = this.department
        if (!Object.keys(_tree).length) return []
        let _employeeList = this.employeeList
        return _employeeList.map((id) => {
          return TreeFind(_tree, (item) => item.user_id === id)
        })
      }
    },
    created () {
      getDepartmentList().then(({data}) => {
        this.department = data
        console.log(data)
      })
    }
  }
</script>