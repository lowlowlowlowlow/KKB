import React, {Component} from "react";

export default function kFormCreate(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      //在未触发onChange的时候额外一份，用于保存校验规则等绑定的时候就可以获得的option
      this.options = {};
    }
    //执行onChange事件时才在this.state中插入键值对
    handleChange = e => {
      // setState name value
      let {name, value} = e.target;
      this.setState({[name]: value});
    };
    //实现双向绑定
    getFieldDecorator = (field, option) => {
      //存在未进行输入就submit的情况，所以校验函数需要在绑定的时候绑定，submit的时候触发
      //此函数绑定时即执行，所以想要获取校验规则等option的时候可以先在this.options上保存一份，不需要等onChange
      this.options[field] = option;
      return InputCmp => {
        //高阶函数在此处的应用，传入一个input，进行改造之后输出一个改造后的input
        //克隆一份
        //此处使用克隆而不是create的原因是本身拥有一个input组件，性能上没必要进行create
        //此处的需求是，没有改造input的情况下，则每一个input需要手写加上getFieldsValue等事件，
        //使用高阶函数改造之后，在原有input的基础上，inputCmp添加了多个方法，使得直接使用input的时候可以直接有getFieldsValue等s事件
        return React.cloneElement(InputCmp, {
          name: field,
          value: this.state[field] || "",
          onChange: this.handleChange
        });
      };
    };
    getFieldsValue = () => {
      return {...this.state};
    };
    getFieldValue = field => {
      return this.state[field];
    };
    validateFields = callback => {
      // 校验错误信息
      const errors = {};
      const state = {...this.state};
      for (let name in this.options) {
        //当input中没有输入内容而出发了submit事件的时候
        if (state[name] === undefined) {
          // 没有输入，判断为不合法
          errors[name] = "error";
        }
      }
      if (JSON.stringify(errors) === "{}") {
        // errors为空则表示没有一个内容出错
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
