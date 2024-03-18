import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCategoryMutation } from "@/redux/api/adminApi";
import { useState } from "react";

const DeleteCategoryModel = ({ category }) => {
	const [submit, deleteCategoryOption] = useDeleteCategoryMutation();
	const [open, setOpen] = useState(false);

	const deleteCategory = () => {
		submit(category._id);
	};

	const afterDeleteHandler = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open}>
			<APICallStatushandler
				options={deleteCategoryOption}
				cb={afterDeleteHandler}
			/>
			<Button onClick={() => setOpen(!open)} variant="outline" size="sm">
				Delete
			</Button>
			<DialogContent closeBtn={false} className="sm:max-w-[700px] p-0">
				<span className="p-5 border-b text-center font-medium text-xl">
					Are you sure?
				</span>

				<div className="p-5 flex gap-x-4 justify-center">
					<Button
						onClick={() => setOpen(false)}
						disabled={deleteCategoryOption.isLoading}
						className="w-36 rounded-xl bg-[#acacac]"
					>
						Cancle
					</Button>
					<Button
						disabled={deleteCategoryOption.isLoading}
						onClick={deleteCategory}
						className="w-36 rounded-xl bg-theamP"
					>
						Confirm
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteCategoryModel;
