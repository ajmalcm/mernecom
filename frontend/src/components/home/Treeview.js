import React from 'react'
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
const Treeview = ({main,sub,Icon,lb,ctgr,setCtgr}) => {
  return (
    <div style={{position:"relative",borderRadius:lb}} className='treeItem'>
    <TreeView
    aria-label="file system navigator"
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    sx={{
      height: "auto",
      flexGrow: 1,
      maxWidth: 400,
      overflowY: "auto",
    }}
  >
    <TreeItem nodeId="1" label={main} collapseIcon={<ExpandMoreIcon/>} expandIcon={<ChevronRightIcon/>} sx={{backgroundColor:"#fff"}}>
    { 
      sub && sub.map((item,index)=>(
      <TreeItem nodeId="2" label={item.sub1} key={index} onClick={()=>{setCtgr(item.sub1)
      }}/>
        ))   
    }
    </TreeItem>
  </TreeView>
    <Icon style={{position:"absolute", right:"5%",top:"15px"}} />
    </div>
  )
}

export default Treeview