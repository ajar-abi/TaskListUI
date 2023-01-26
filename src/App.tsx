import React from 'react';
import * as API from './service/api'
import './App.css';

class TaskList extends React.Component <{}, any>{

  private selectList = {id: {}, taskName: "", taskid: ""}

  constructor(props:any) {
    super(props);
    this.state = {taskList: [] as any};
  }

  componentDidMount(): void {
    this.viewTask(); 
  }

  viewTask = () => {
    API.viewTask().then((res) => {
      console.log(" res  = > ", res);
      this.setState({
        taskList: [...res.data]
     });
    }).catch((err) => {
      console.log(" Error  ", err);
    })
  }

  addTask = () => {
    const taskCount = this.state.taskList.length;
    const requestData = { taskid: "tID"+ taskCount, taskName: "task"+ taskCount }
    API.taskCreate(requestData).then((res) => {
      this.viewTask();
    }).catch((err) => {
      console.log(" Error  ", err);
    })
  }

  taskChanged = (task: any, id: number) => {
    this.selectList = task;
  }

  deleteTask = (task: string) => {

    const el: HTMLElement = document.getElementById(task);
    if(this.selectList?.taskid === task || el['checked']) {
      const taskReq = {taskid: task};
      API.deleteTask(taskReq).then((res) => {
        console.log(" deleted  !! ", task);
        this.viewTask();
      }).catch((err) => {
       console.log(" Error  ", err);
      })
    }
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <button type="button" onClick={this.addTask}> + </button><span> Add the task</span>
        <br />
        {this.state.taskList.map((user:any, ind: number) => (
          <div style={{"padding": "5px", "marginTop": "10px"}}>
            <span>
              <input id={user?.taskid} name="Task" type="radio" value={user?.taskid} onChange={e=> {this.taskChanged(user, ind)}}/>
              <label>{user.taskName}</label>
              <input type="button" style={{"padding": "2px", "marginLeft" : "20px"}} value="Delete" onClick={e=> {this.deleteTask(user?.taskid)}}/>
            </span>
          </div>
        ))}  
      </div>
    )
  }
}

export default TaskList
