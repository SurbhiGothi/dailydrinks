
import React from 'react';

class ManageDrinks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      act:0,
      index:'',
      datas:[],
      selectedFile:'',
      removeId:'',
      name:'',
      description:'',
      disabled:true,
      FileUploaded:false
    }
    this.fileReader = new FileReader();
  }
  componentDidMount(){
      if(JSON.parse(localStorage.getItem('data'))!==null){//to get data from the localstorage
    this.setState({datas:JSON.parse(localStorage.getItem('data'))})
      }
  }

  submit=(e)=>{//for adding or updating Drink
    e.preventDefault();
    let datas=this.state.datas;
    let imagePath=this.state.selectedFile;
    let name=this.refs.name.value;
    let price=this.refs.price.value;
    let description=this.refs.description.value;
    if(this.state.act===0){
      let data={
        imagePath,name,price,description
      }
    datas.push(data);
    }else{
      let index=this.state.index;
      datas[index].imagePath=imagePath;
      datas[index].name=name;
      datas[index].price=price;
      datas[index].description=description;
    }
    this.setState({
      datas:datas,
      act:0,disabled:true,
      removeId:''
    })
    localStorage.setItem('data',JSON.stringify(datas))
      this.refs.myForm.reset();
  }

  remove=()=>{//to delete drink
    let datas=this.state.datas;
    datas.splice(this.state.removeId,1);
    this.setState({
      datas:datas
    });
    localStorage.setItem('data',JSON.stringify(datas))
    this.refs.myForm.reset();
  }

  edit=(i)=>{ //to edit drink
    let datas=this.state.datas[i];
    
    this.refs.name.value=datas.name;
    this.refs.price.value=datas.price;
    this.refs.description.value=datas.description;
    this.setState({
      act:1,
      index:i,
      selectedFile:datas.imagePath
    })
    
  }
  fileselectHandler=e=>{//to add image
    e.preventDefault();
        let self = this; 
        self.setState({ images: '' }); 
        const imageFiles = e.target.files; 
        const filesLength = imageFiles.length; 
        for(var i = 0; i < filesLength; i++) {
            let reader = new FileReader();
            let file = imageFiles[i];
           this.setState({FileUploaded:true},this.checkNotNull)
            reader.onloadend = () => {
                self.setState({ selectedFile: self.state.images.concat(reader.result)});
            }
            reader.readAsDataURL(file);
            ;
        } 
  }
  checkNotNull=()=>{
      if(this.refs.name.value!==""&&this.refs.price.value!==""){
        this.setState({disabled:false})
      }
  }

  render(){
    let datas=JSON.parse(localStorage.getItem('data'));
    return(
      <div>
          <div className="mainHeader">
     <span className="float-left">Daily Drinks</span>
     <button type="button" className="btn btn-info btn-lg float-right" data-toggle="modal" data-target="#myModal">New Order</button>
     </div>
      {datas!==null &&datas.length>0?
     <table className="table table-striped customtable">
  <thead>
    <tr className="header">
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th colSpan="2" className="action">Action</th>
    </tr>
  </thead>
  <tbody>
  {datas.map((data,index)=>
    <tr key={index}>
      <td className="customCol">{index}</td>
      <td><img src={data.imagePath} alt="drinkImg"/></td>
      <td className="customCol">{data.name}</td>
      <td className="customCol">{data.price}</td>
      <td className="customCol">{data.description}</td>
      <td className="customCol"><button onClick={()=>this.setState({removeId:index})} className="btn myListButton" data-toggle="modal" data-target="#remove">Remove</button></td>
      <td className="customCol"><button onClick={()=>this.edit(index)} data-toggle="modal" data-target="#myModal" className="btn myListButton">Edit</button></td>
    </tr>
 )}
 </tbody>
</table>:<div className="noRecord">There are no Drink to Display, Please add Daily Drink</div>}
<div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Manage Drink</h4>
                <button type="button" className="close"  data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
            <form ref="myForm" className="myForm">
            <input type="file" ref="image" onChange={this.fileselectHandler}></input>
            <input type="text" onChange={this.checkNotNull} required="true"  ref="name" name="name"  placeholder="Your Name" className="formField"/>
            <input type ="number" ref="price" onChange={this.checkNotNull} name="price" placeholder="Your price" className="formField"/>
            <textarea type ="text" ref="description" onChange={this.checkNotNull} name="description" placeholder="Your Description" className="formField"/>
            <div className="modal-footer"> 
            <button onClick={this.submit} className="btn btn-default" data-dismiss="modal" disabled={this.state.disabled} >Save</button>
            <button type="button" className="btn btn-default" onClick={this.close} data-dismiss="modal">Close</button>
            </div>
            </form>
            </div>
    </div>
  </div>
</div>
    
<div className="modal fade" id="remove" role="dialog">
    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Modal Header</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to Delete?</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={this.remove} data-dismiss="modal">Yes</button>
          <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
        </div>
      </div>
      
    </div>
  </div>
      </div>
    )
  }
}

export default ManageDrinks;
