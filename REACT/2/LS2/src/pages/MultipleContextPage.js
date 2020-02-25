import React, {Component} from "react";
import {ThemeConsumer} from "../ThemeContext";
import {UserConsumer} from "../userContext";

export default class MultipleContextPage extends Component {
  render() {
    return (
      <div>
        <h3>MultipleContextPage</h3>
        {/* 由于在contextPage里面是由ThemeProvider包裹着UserProvider，所以此处consumer也要对应包裹 */}
        <ThemeConsumer>
          {/* 在ThemeConsumer下自定义theme变量，后跟函数包裹UserConsumer */}
          {theme => (
            <UserConsumer>
              {/* 在UserConsumer下自定义user变量，后跟函数，可同时使用themeContext和userContext上下文中的数据 */}
              {user => <div className={theme.themeColor}>{user.name}</div>}
            </UserConsumer>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}
