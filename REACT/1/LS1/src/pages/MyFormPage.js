import React, {Component} from "react";
import kFormCreate from "../components/kFormCreate";

const nameRules = {required: true, message: "please input ur name"};
const passwordRules = {required: true, message: "please input ur password"};

@kFormCreate
class MyFormPage extends Component {
  submit = () => {
    const {getFieldsValue, getFieldValue, validateFields} = this.props;
    validateFields((err, values) => {
      if (err) {
        console.log("err", err); //sy-log
      } else {
        console.log("success", values); //sy-log
      }
    });
    console.log("submit", getFieldsValue(), getFieldValue("password"));
  };
  render() {
    console.log("props", this.props); //sy-log
    const {getFieldDecorator} = this.props;
    return (
      <div>
        <h3>MyFormPage</h3>
        {/* getFieldDecorator是一个方法，这个方法接收两个参数，
        第一个是表单的字段对象，第二个是验证规则。
        这个方法本身返回一个方法，需要将需要获取值的标签包裹进去*/}
        {getFieldDecorator("name", {rules: [nameRules]})(
          <input type="text" placeholder="please input ur name" />
        )}
        {getFieldDecorator("password", {rules: [passwordRules]})(
          <input type="password" placeholder="please input ur password" />
        )}
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default MyFormPage;
