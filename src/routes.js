import MainPage from './pages/MainPage.vue';
import CreatePath from './pages/CreatePath.vue';
import MyPaths from './pages/MyPaths.vue';
import Profile from './pages/Profile.vue';

export default [
	{path: '/', component: MainPage},
	{path: '/profile', component: Profile},
	{path: '/my-paths', component: MyPaths},
	{path: '/create-path', component: CreatePath}
];