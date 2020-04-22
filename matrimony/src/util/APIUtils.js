import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            console.log('json :',json);
            console.log('response.ok',response.ok);
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
        
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getOverviewList(){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: API_BASE_URL + "/auth/overviews?page=0&size=10&sort=createdAt,desc",
            method: 'GET'
        });
        //return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/user/overviews?page=0&size=10&sort=createdAt,desc",
        method: 'GET'
    });
}

export function getUserList(page,size){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/user/users?page="+page+"&size="+size+"&sort=id",
        method: 'GET'
    });
}

export function addUser(userRequest) {
    console.log(JSON.stringify(userRequest));
    return request({
        url: API_BASE_URL + "/api/user/users",
        method: 'POST',
        body: JSON.stringify(userRequest)
    });
}

export function updateUser(userRequest) {
    return request({
        url: API_BASE_URL + "/api/user/users/"+userRequest.id,
        method: 'PUT',
        body: JSON.stringify(userRequest)
    });
}

export function updateGeneralProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/api/user/profile/"+profileRequest.id,
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function updateFamilyProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/api/user/familyProfile/"+profileRequest.id,
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function updateAstroProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/api/user/astroProfile/"+profileRequest.id,
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function updateCareerProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/api/user/careerProfile/"+profileRequest.id,
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function updatePartnerPreferenceProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/api/user/partnerPreference/"+profileRequest.id,
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function fetchUserById(id) {
    return request({
        url: API_BASE_URL + "/api/user/users/" + id,
        method: 'GET'
    });
}

export function fetchGeneralProfileById(id) {
    return request({
        url: API_BASE_URL + "/api/user/profile/" + id,
        method: 'GET'
    });
}

export function fetchFamilyProfileById(id) {
    return request({
        url: API_BASE_URL + "/api/user/familyProfile/" + id,
        method: 'GET'
    });
}

export function fetchAstroProfileById(id) {
    return request({
        url: API_BASE_URL + "/api/user/astroProfile/" + id,
        method: 'GET'
    });
}

export function fetchCareerProfileById(id) {
    return request({
        url: API_BASE_URL + "/api/user/careerProfile/" + id,
        method: 'GET'
    });
}

export function fetchPartnerPreferenceProfileById(id) {
    return request({
        url: API_BASE_URL + "/api/user/partnerPreference/" + id,
        method: 'GET'
    });
}

export function addOverview(overviewRequest) {
    return request({
        url: API_BASE_URL + "/api/user/overviews",
        method: 'POST',
        body: JSON.stringify(overviewRequest)
    });
}

export function updateOverview(overviewRequest) {
    return request({
        url: API_BASE_URL + "/api/user/overviews/"+overviewRequest.id,
        method: 'PUT',
        body: JSON.stringify(overviewRequest)
    });
}

export function fetchOverviewById(id) {
    return request({
        url: API_BASE_URL + "/api/user/overviews/" + id,
        method: 'GET'
    });
}

export function getMissionList(){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: API_BASE_URL + "/auth/missions?page=0&size=10&sort=id",
            method: 'GET'
        });
    }

    return request({
        url: API_BASE_URL + "/api/user/missions?page=0&size=10&sort=id",
        method: 'GET'
    });
}

export function addMission(missionRequest) {
    return request({
        url: API_BASE_URL + "/api/user/missions",
        method: 'POST',
        body: JSON.stringify(missionRequest)
    });
}

export function updateMission(missionRequest) {
    return request({
        url: API_BASE_URL + "/api/user/missions/"+missionRequest.id,
        method: 'PUT',
        body: JSON.stringify(missionRequest)
    });
}

export function fetchMissionById(id) {
    return request({
        url: API_BASE_URL + "/api/user/missions/" + id,
        method: 'GET'
    });
}

export function getLeadershipList(){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        //return Promise.reject("No access token set.");
        return request({
            url: API_BASE_URL + "/auth/leaderships?page=0&size=10&sort=id",
            method: 'GET'
        });
    }

    return request({
        url: API_BASE_URL + "/api/user/leaderships?page=0&size=10&sort=id",
        method: 'GET'
    });
}

export function addLeadership(leadershipRequest) {
    return request({
        url: API_BASE_URL + "/api/user/leaderships",
        method: 'POST',
        body: JSON.stringify(leadershipRequest)
    });
}

export function updateLeadership(leadershipRequest) {
    return request({
        url: API_BASE_URL + "/api/user/leaderships/"+leadershipRequest.id,
        method: 'PUT',
        body: JSON.stringify(leadershipRequest)
    });
}

export function fetchLeadershipById(id) {
    return request({
        url: API_BASE_URL + "/api/user/leaderships/" + id,
        method: 'GET'
    });

}

export function getAwardList(){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        //return Promise.reject("No access token set.");
        return request({
            url: API_BASE_URL + "/auth/awards?page=0&size=10&sort=id",
            method: 'GET'
        });
    }

    return request({
        url: API_BASE_URL + "/api/user/awards?page=0&size=10&sort=id",
        method: 'GET'
    });
}

export function addAward(awardRequest) {
    return request({
        url: API_BASE_URL + "/api/user/awards",
        method: 'POST',
        body: JSON.stringify(awardRequest)
    });
}

export function updateAward(awardRequest) {
    return request({
        url: API_BASE_URL + "/api/user/awards/"+awardRequest.id,
        method: 'PUT',
        body: JSON.stringify(awardRequest)
    });
}

export function fetchAwardById(id) {
    return request({
        url: API_BASE_URL + "/api/user/awards/" + id,
        method: 'GET'
    });
}

export function getTestimonialList(){
    
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        //return Promise.reject("No access token set.");
        return request({
            url: API_BASE_URL + "/auth/testimonials?page=0&size=10&sort=id",
            method: 'GET'
        });
    }

    return request({
        url: API_BASE_URL + "/api/user/testimonials?page=0&size=10&sort=id",
        method: 'GET'
    });
}

export function addTestimonial(testimonialRequest) {
    return request({
        url: API_BASE_URL + "/api/user/testimonials",
        method: 'POST',
        body: JSON.stringify(testimonialRequest)
    });
}

export function updateTestimonial(testimonialRequest) {
    return request({
        url: API_BASE_URL + "/api/user/testimonials/"+testimonialRequest.id,
        method: 'PUT',
        body: JSON.stringify(testimonialRequest)
    });
}

export function fetchTestimonialById(id) {
    return request({
        url: API_BASE_URL + "/api/user/testimonials/" + id,
        method: 'GET'
    });
}