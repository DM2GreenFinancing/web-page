import React, { useState } from 'react';
import { render } from 'react-dom';
import { Menu, message, Layout, Breadcrumb, Row, Radio, Form , Button } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  const [value, setValue] = React.useState({});
  
  const onChange = e => {
    const obj = e.target.value.split(' ');
    const key = obj.shift()
    let a = {[key]: obj};
    setValue({...value, ...a});
  };

  const removeQuestion = e =>{
    console.log(e);
  }

  const done = () =>{
    let obj = {};
    for(let k in value){
      for(let v of value[k]){
        if(obj[v]){
          obj[v]++
        }else{
          obj[v] =1;
        }
      }
    }
    alert(JSON.stringify(obj))
  }

  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      DM Green Financing Tool
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Questions</Breadcrumb.Item>
      </Breadcrumb>
      <Form>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Form.Item label="Is there a private development partner involved in the project?">
      <Radio.Group onChange={onChange}>
        <Radio value='Q1 P'>Yes</Radio>
        <Radio value='Q1 D B'>No</Radio>
        </Radio.Group>
        </Form.Item>
    
        <Form.Item label="Is this a short-term project? (Less than 5 years)">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q2 D'>Yes</Radio>
            <Radio value='Q2 P B' onClick={removeQuestion}>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Is this a medium term project? (Between 5-10 years)" hidden={value['Q2']?.includes('D') ? false : true}>
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q3 P D B'>Yes</Radio>
            <Radio value='Q3' >No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Is this a long term project? (Greater than 10 years)">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q4 P B'>Yes</Radio>
            <Radio value='Q4 D'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Is the project size greater than $1 million?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q5 P B'>Yes</Radio>
            <Radio value='Q5 D'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Is funding already secured for this project?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q6 P'>Yes</Radio>
            <Radio value='Q6 D B'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Is there a financial institution involved in the project?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q7 D B'>Yes</Radio>
            <Radio value='Q7 P'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Will the DM want oversight of the project development?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q8 P'>Yes</Radio>
            <Radio value='Q8 D B'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item label="Does the DM forsee interest rates rising over the course of the project?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q9 D'>Yes</Radio>
            <Radio value='Q9 P B'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>

        <Form.Item label="Does the DM currently have the capacity to complete impact tracking that follows a strict international framework?">
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q10 B'>Yes</Radio>
            <Radio value='Q10 P D'>No</Radio>
          </Radio.Group>
          </Row>
        </Form.Item>
       <Button onClick={done}> Done</Button>
      </div>
      </Form>
    </Content>
    
    <Footer style={{ textAlign: 'center' }}>DM Green Financing Tool ©2022</Footer>
  </Layout>
)};

export default App;
