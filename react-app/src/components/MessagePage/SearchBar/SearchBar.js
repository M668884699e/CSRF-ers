// src/components/MessagePage/SearchBar/SearchBar.js

// import css
import './SearchBar.css';

// import react-redux
import { useSelector } from 'react-redux';

// import component
import RightSearchBar from './RightSearchBar';

//? Search Bar Component
const SearchBar = () => {
	return (
		<header id='search-bar-main'>
			<section id='left-bar-section'>
				<section id='left-section'></section>
			</section>
			<section id='center-bar-section'>
				<figure className='slackers-with-text'>
					{/* <img
						src='https://i.ibb.co/17QcrJw/slack-logo.png'
						id='nav-logo'
						alt='slack-logo'
					/> */}
					<img src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1674183359/CSRF-ers/Logo_w_text_evbrbv.png" id="nav-logo" alt="slackers-logo" />
				</figure>
			</section>

			{/* Right Bar Section component */}
			<RightSearchBar />
		</header>
	);
};

// export component
export default SearchBar;
