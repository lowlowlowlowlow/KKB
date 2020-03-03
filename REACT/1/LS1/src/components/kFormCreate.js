import React, {Component} from "react";

//kFormCreate传入一个组件Cmp，返回一个增加功能后的组件，即高阶组件
export default function kFormCreate(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {errors: {}};
      //在未触发onChange的时候额外一份，用于保存校验规则等绑定的时候就可以获得的option
      this.options = {};
    }
    //执行onChange事件时才在this.state中插入键值对
    handleChange = e => {
      // setState name value
      let {name, value} = e.target;
      //this.setState({[name]: value});
      //表单每更改一次，则触发一次验证
      this.validate({
        ...this.state,
        [name]: value
      });
    };
    //实现双向绑定（由于是一开始就执行此函数，所以到onChange触发handleChange事件时，e.target上可以获取到name和value(对应的两个表单)）
    getFieldDecorator = (field, option) => {
      //field表单名称
      //option:表单校验规则
      //存在未进行输入就submit的情况，所以校验函数需要在绑定的时候绑定，submit的时候触发
      //此函数绑定时即执行，所以想要获取校验规则等option的时候可以先在this.options上保存一份，不需要等onChange
      this.options[field] = option;
      return InputCmp => {
        //高阶函数在此处的应用，由MyFormPage.js可知，传入的是一个input，进行改造之后输出一个改造后的input
        //则此处InputCmp即Input
        //克隆一份
        //此处使用克隆而不是create的原因是本身传入一个input组件，性能上没必要进行create
        //此处的需求是，没有改造input的情况下，则每一个input需要手写加上getFieldsValue等事件，
        //使用高阶函数改造之后，在原有input的基础上，inputCmp添加了多个方法，使得直接使用input的时候可以直接有getFieldsValue等事件
        return (        
          <div>
            {React.cloneElement(InputCmp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange
            })};
            <p className="red">{this.state.errors[field]}</p>
          </div>
        )

      };
    };
    getFieldsValue = () => {
      return {...this.state};
    };
    getFieldValue = field => {
      return this.state[field];
    };
    validate = state => {
      const errors = {};
      // const state = {...this.state};
      for (let name in this.options) {
        if (state[name] === undefined) {
          // 没有输入，判断为不合法
          errors[name] = this.options[name].rules[0].message; //"error";
        }
      }
      //验证之后更新state并添加对应出错的错误提示
      this.setState({...state, errors});
    };
    validateFields = callback => {
      // 校验错误信息
      const state = {...this.state};
      // for (let name in this.options) {
      //   //当input中没有输入内容而出发了submit事件的时候
      //   if (state[name] === undefined) {
      //     // 没有输入，判断为不合法
      //     errors[name] = this.options[name].rules[0].message; //"error";
      //   }
      // }
      // if (JSON.stringify(errors) === "{}") {
      //   // errors为空则表示没有一个内容出错
      //   // 合法
      //   callback(undefined, state);
      // } else {
      //   callback(errors, state);
      // }
      this.validate(state);
      const {errors} = this.state;
      if (JSON.stringify(errors) === "{}") {
        // 合法
        callback(undefined, state);
      } else {
        callback(errors, state);
      }
    };
    render() {
      return (
        <div className="border">
          <Cmp
            getFieldDecorator={this.getFieldDecorator}
            getFieldsValue={this.getFieldsValue}
            getFieldValue={this.getFieldValue}
            validateFields={this.validateFields}
          />
        </div>
      );
    }
  };
}
