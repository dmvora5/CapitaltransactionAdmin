export const PATH = {
	login: "/login",
	categoryById: "/dashboard/category/",
	categoryList: "/dashboard/category/list",
	userDocsLicence: "/dashboard/userdocs/drivinglicence/",
	userDocePassport: "/dashboard/userdocs/passport/",
	userDocsDigitalId: "/dashboard/userdocs/digitalid/",
	userRealEstate: "/dashboard/property/realestate/",
	userEquipment: "/dashboard/property/equipment/",
};

export const protectedRoutes = [
	"/",
	"/dashboard/category",
	"/dashboard/category/list",
	"/dashboard/category/[id]",
	"/dashboard/userdocs/drivinglicence",
	"/dashboard/userdocs/drivinglicence/[id",
];

export const authRoutes = ["/login"];

export const withoutLayoutRoutes = ["/login"];

export const redirect_after_login = "/dashboard/category";
