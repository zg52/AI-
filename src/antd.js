/*
 * @Author: long
 * @Date: 2021-07-29 19:09:17
 * @LastEditTime: 2021-08-25 10:57:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\antd.js
 */
import Vue from 'vue'
import {
    Button, Table, Icon, Breadcrumb, Dropdown, PageHeader, Pagination, Steps, AutoComplete, Cascader,
    Checkbox, DatePicker, Form, FormModel, Input, InputNumber, Radio, Select, Switch, TimePicker, Upload,
    Descriptions, Empty, List, Popover, Statistic, Tabs, Tag, Tooltip, Tree, Alert, Drawer, message,
    Modal, Notification, Popconfirm, Result, Spin, BackTop, Menu, ConfigProvider, Row, Col, Divider, Avatar 
} from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

loadAnt(Button, 'button')
loadAnt(Table, 'table')
loadAnt(Icon, 'icon')
loadAnt(Breadcrumb, 'breadcrumb')
loadAnt(PageHeader, 'page-header')
loadAnt(Pagination, 'pagination')
loadAnt(Steps || Steps.Step, 'steps')
loadAnt(AutoComplete, 'auto-complete')
loadAnt(Cascader, 'cascader')
loadAnt(Checkbox || Checkbox.Group, 'checkbox')
loadAnt(DatePicker || DatePicker.RangePicker || DatePicker.MonthPicker, 'date-picker')
loadAnt(Form || Form.Item, 'form')
loadAnt(FormModel, 'form-model')
loadAnt(InputNumber, 'input-number')
loadAnt(Select || Select.Option, 'select')
loadAnt(Radio || Radio.Button || Radio.Group, 'radio')
loadAnt(Dropdown, 'dropdown')
loadAnt(Switch, 'switch')
loadAnt(TimePicker, 'time-picker')
loadAnt(Upload || Upload.Dragger, 'upload')
loadAnt(Popover, 'popover')
loadAnt(Tabs, 'tabs')
loadAnt(Tag, 'tag')
loadAnt(Tooltip, 'tooltip')
loadAnt(Modal, 'modal')
loadAnt(Popconfirm, 'popconfirm')
loadAnt(Result, 'result')
loadAnt(Empty, 'empty')
loadAnt(Menu || Menu.Item, 'menu')
loadAnt(ConfigProvider, 'config-provider')
loadAnt(Input, 'input')
loadAnt(Row, 'row'), loadAnt(Col, 'col')
loadAnt(Drawer, 'drawer')
loadAnt(Alert, 'alert')
loadAnt(Divider, 'divider')
loadAnt(Avatar, 'avatar')
// Vue.component(Message, Message)

Vue.prototype.$msg = message

Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$Confirm = Modal.confirm

function loadAnt(tag, name) {
    require(`ant-design-vue/lib/${name}/style`)
    Vue.component(tag.name, tag), Vue.use(tag)
}

