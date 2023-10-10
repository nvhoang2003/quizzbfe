import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

//---------------------------------------------------

export default function CheckQuestion(props) {
  const { questionResult, listIdSelected, isSubmit, item } = props;

  return (

    <div>
    
      {isSubmit === true &&
        questionResult &&
        listIdSelected.includes(item.id) &&
        questionResult.answer.map((resultItem, resultIndex) => {
          if (resultIndex === 0 ) {
            if(item.fraction === 0 && resultItem.fraction === 0 || item.fraction === 0 && resultItem.fraction !== 0 ){
             return <span key={resultIndex}>
              <ClearIcon/>
            </span>;
            }
            if(item.fraction !== 0 && resultItem.fraction === 0 || item.fraction !== 0 && resultItem.fraction !== 0 ){
             return <span key={resultIndex}>
              <DoneIcon/>
            </span>;
            }
          } else {
            return null;
          }
        })}

    </div>
  )

}




