import classNames from "classnames"
import Link from "@/components/Link"
import { PlusIcon,PencilSquareIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import Button from "@/components/Button"


const LayoutList = (props) => {
  const { className, listId,onClick, onChange, ...otherProps } = props

  return (
    <div {...otherProps} className={classNames("border-b-2 border-slate-200", className)}>
      <Link className="p-1" href={`/list/${listId}/addTask`}><PlusIcon className="w-4" /></Link>
      <Link className="p-1" href={`/list/${listId}/edit`}>
        <PencilSquareIcon  className="w-4" />
      </Link>
      <Button type="button" variant="transparent" size="tr" onClick={onClick}>
        <TrashIcon className="w-4" />
      </Button>
      <Button type="button" variant="transparent" size="tr" className="p-1 flex flex-grow justify-end" onChange={onChange}>
        <CheckCircleIcon  className="w-4" />
      </Button>
    </div>
  )
}

export default LayoutList
