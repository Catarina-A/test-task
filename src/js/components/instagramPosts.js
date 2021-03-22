import axios from 'axios';
import {getCookie, setCookie, deleteCookie, listCookies} from '../helpers/cookie-scripts'

export default () => {
    const instaUser = 'georgesmithfurniture';
    const instaContainer = '.insta__gallery';
    const instagramRegExp = new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/)

    const fetchInstagramPhotos = async (accountUrl) => {
        const response = await axios.get(accountUrl)
        const json = JSON.parse(response.data.match(instagramRegExp)[1])
        const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 10)
        const photos = edges.map(({node}) => {
            return {
                url: `https://www.instagram.com/p/${node.shortcode}/`,
                thumbnailUrl: node.thumbnail_src,
                displayUrl: node.display_url,
                caption: node.edge_media_to_caption.edges[0].node.text
            }
        })
        return photos
    }

    async function getInstagramPosts(profileName) {
        try {
            /**
             * Async get instagram posts and write to localStorage
             * Create Instagram posts
             */
                // console.log('Try');
            const photos = await fetchInstagramPhotos('https://www.instagram.com/' + profileName)
            //Set posts need
            photos.length = 5;
            instaPosts(photos);
            createInstagramPosts(photos);

        } catch (e) {
            /**
             * Delete cookie localData if cors error
             */
            //console.log('Error');
            setTimeout(function () {
                // console.log(getCookie('localData'));
                deleteCookie('localData');
            }, 500);
        }
    }

    if (getCookie('localData')) {
        if (getCookie('localData') !== 'false') {
            /**
             * Get posts in localStorage
             * Create Instagram posts
             */
            console.log('cookies set: localData');

            let instaPosts = localStorage.getItem('instagram');
            let values = JSON.parse(instaPosts);
            createInstagramPosts(values);

        } else {
            createLocalDataCookie();
        }
    } else {
        createLocalDataCookie();
    }

    function createLocalDataCookie() {
        /**
         Set cookie 4 hours
         Async get instagram posts and write to localStorage
         Remove localStorage instagram
         */
            //console.log('no cookies: localData');

        let date = new Date();
        let hour = 4;
        date.setTime(date.getTime() + hour * 60 * 60 * 1000);
        setCookie('localData', '1', date, '/');

        localStorage.removeItem('instagram');

        getInstagramPosts(instaUser);
    }

    function createInstagramPosts(values) {
        values.forEach(function (el) {
            //console.log(el);

            const container = document.querySelector(instaContainer);
            if (container) {
                //Create elements
                const instagramLink = document.createElement('a')
                const instagramImg = document.createElement('img')

                //Add classes
                instagramLink.classList.add('insta__item')

                //Link
                instagramLink.setAttribute('href', el.url)
                instagramLink.setAttribute('target', '_blank')
                instagramLink.setAttribute('rel', 'noopener noreferrer')

                //Image
                instagramImg.setAttribute('src', el.thumbnailUrl)
                instagramImg.setAttribute('alt', el.caption)
                instagramImg.classList.add('insta__img')

                //Create html
                instagramLink.appendChild(instagramImg)

                container.appendChild(instagramLink)
            }

        });
    }

    function instaPosts(instaJsonPosts) {
        localStorage.setItem('instagram', JSON.stringify(instaJsonPosts));
    }


};