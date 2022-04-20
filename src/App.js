import React, { useState } from 'react';
import { Menu, Layout, Breadcrumb, Row, Radio, Form , Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  const [value, setValue] = React.useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = React.useState([]);
  const [form] = Form.useForm();
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setValue({});
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue({});
    form.resetFields();
  };

  const onChange = e => {
    let state ={};
    const obj = e.target.value.split(' ');
    const key = obj.shift();

    state = {[key]: obj};
    if(key === 'Q1' && !obj.includes('X')){
      form.resetFields(['Q2', 'Q3']);
      state={
        'Q1':['D'],
        'Q2':[''],
        'Q3': ['']
      }
      
    } if(key === 'Q2' && !obj.includes('X')){
      form.resetFields(['Q3']);
      state={
        'Q2':['P', 'D', 'B'],
        'Q3': ['']
      }
      
    }
    setValue({...value, ...state});
  };
  // This function sum how many different letter we have. After the sumation is done it pushes to the state
  const done = () =>{
    let obj = {};
    for(let k in value){
      for(let v of value[k]){
        if(obj[v]){
          obj[v]++
        }else if(v !== 'X'){
          obj[v] =1;
        }
      }
    }
    // P = Public Private Partnership
    // B = Green Bonds
    // D = Sustainability Improvement Derivative

    // This line bellow order the objec in ascending order, and then push the resul into an array before showing it
    let txtArray = [];
    const sortable = Object.entries(obj)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    // Change BELOW: Public Private Partnership, Green Bonds, Sustainability Improvement Derivative 
    // to alter the "push" notification of the final count based on COUNT OF P, B,D//

    if(value['Q1'].includes('D')){
      txtArray.push('Sustainability Improvement Derivative');
    }else{
      for (let key in sortable){
          if(key === 'P')
            txtArray.push(`Public Private Partnership: ${obj.P || 0}`);
          else if(key === 'B')
            txtArray.push(`Green Bonds: ${obj.B || 0}`);
          else if(key ==='D')
            txtArray.push(`Sustainability Improvement Derivative: ${obj.D || 0}`);
      }
      // Change D, P, B, X to alter  the count of values related to the question Q 
    }
    setModalText(txtArray)
    showModal();
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
        {/* INSERT DESCRIPTION BELLOW */}
        <Breadcrumb.Item>
        <p>The Green Finance Ranking Tool will help narrow down which financial instrument should be used for a proposed project. The Tool can recommend three financial instruments: Public-Private Partnerships, Sustainability Improvement Derivatives, and Green Bonds.</p> 
        <p>Answer each question with a Yes or a No depending on the characteristics of the proposed project</p>
        <p>All questions are required to be answered​</p>
        <p>Once all questions are answered, the Green Financing Ranking Tool will rank the financial instrument that best fits the project</p>
        <Row>The best possible score is a 7, reconsider options less than 4​ <br/>Best Fit: 6 and 7​ <br/> Good Fit: 4 and 5</Row>​
        <Row>We recommend comparing the Tools' rankings against the competitive analysis matrix​ </Row>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form form={form} onFinish={done}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Form.Item name='Q1' label="Is the project's investment horizon short-term? (Less than 5 years)?"
      // *Change potential question for Q1 above* 
       rules={[{ required: true, message:'Please select an option' }]}
      >
      <Radio.Group onChange={onChange} >
        <Radio value='Q1 D'>Yes</Radio>
        <Radio value='Q1 P B X'>No</Radio>
        </Radio.Group>
        </Form.Item>
        {/* Change D, P, B, X to alter  the count of values related to the question Q */}
        <Form.Item name="Q2" label="Is the project's investment horizon medium term? (Between 5-10 years)" 
       // *Change potential question for Q2 above* 
       hidden={value['Q1']?.includes('X') ? false : true}
        rules={[{ required: value['Q1']?.includes('X'), message:'Please select an option' }]}

        >
        <Row>
          <Radio.Group onChange={onChange}>
            <Radio value='Q2 P D B'>Yes</Radio>
            <Radio value='Q2 X'>No</Radio>
            {/* Change D, P, B, X to alter  the count of values related to the question Q  */}
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item name="Q3" label="Is the project's investment horizon long term? (Greater than 10 years)" 
        // *Change potential qustion for Q3 above* 
        hidden={value['Q2']?.includes('X') ? false : true}
        rules={[{ required: value['Q2']?.includes('X'), message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q3 P B'>Yes</Radio>
            <Radio value='Q3 D' >No</Radio>
            {/* Change D, P, B, X to alter  the count of values related to the question Q  */}
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item name="Q4" label="Is the estimated project size greater than $1 million?"
        // *Change potential qustion for Q4 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q4 P B'>Yes</Radio>
            <Radio value='Q4 D'>No</Radio>
            {/* Change D, P, B, X to alter  the count of values related to the question Q  */}
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item name="Q5" label="Does the project still need to raise funding?"
        // *Change potential question for Q5 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q5 B D'>Yes</Radio>
            <Radio value='Q5 P'>No</Radio>
            {/* Change D, P, B, to alter  the count of values related to the question Q  */}
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item name="Q6" label="Does the DM desire contractual oversight of the project development?"
        // *Change potential question for Q6 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q6 P'>Yes</Radio>
            <Radio value='Q6 B D'>No</Radio>
            {/* Change D, P, B, to alter  the count of values related to the question Q  */}
          </Radio.Group>
          </Row>
        </Form.Item>
        <Form.Item name="Q7" label="Does the DM forsee interest rates rising over the course of the project?"
        // *Change potential qustion for Q7 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q7 D'>Yes</Radio>
            <Radio value='Q7 B P'>No</Radio>
          </Radio.Group>
          {/* Change D, P, B to alter  the count of values related to the question Q  */}
          </Row>
        </Form.Item>
        <Form.Item name="Q8" label="Does the DM have (or plans to obtain) the capacity to complete impact tracking?"
            // *Change potential question for Q8 above* 
        rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q8 B'>Yes</Radio>
            <Radio value='Q8 D P'>No</Radio>
          </Radio.Group>
          {/* Change D, P, B, to alter  the count of values related to the question Q  */}
          </Row>
        </Form.Item>
        <Form.Item name="Q9" label="Is a private partnership expected to be part of the project?"
            // *Change potential question for Q9 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q9 P'>Yes</Radio>
            <Radio value='Q9 B D'>No</Radio>
          </Radio.Group>
          {/* Change D, P, B, to alter  the count of values related to the question Q  */}
          </Row>
        </Form.Item>

        <Form.Item name="Q10" label="Will the project potentially align with the Green Bond Principles?"
            // *Change potential question for Q10 above* 
         rules={[{ required: true, message:'Please select an option' }]}
        >
        <Row>
          <Radio.Group onChange={onChange} >
            <Radio value='Q10 B'>Yes</Radio>
            <Radio value='Q10 D P'>No</Radio>
          </Radio.Group>
          {/* Change D, P, B, to alter  the count of values related to the question Q  */}
          </Row>
        </Form.Item>
       <Button type='primary' htmlType="submit"> Done</Button>
      </div>
      </Form>
    </Content>
    
    <Footer style={{ textAlign: 'center' }}>DM Green Financing Tool ©2022</Footer>

    <Modal title="Result" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 
      footer={[
        <Button key="back" type='primary' onClick={handleOk}>
          Ok
        </Button>
      ]}
    >
    <li>
      {modalText.map((txt, i) => <ul key={i}>{txt}</ul>)}
       </li>
      </Modal>
  </Layout>
  
)};

export default App;