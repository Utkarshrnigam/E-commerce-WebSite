import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Selector = (props) => {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a category"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {props.list.map((ele) => {
        return (
          <Option key={ele._id} value={props.setCategoryHandler(ele.name)}>
            {ele.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default Selector;
