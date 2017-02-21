var osmAuth = require('osm-auth');
var xmlJsonParser = require('./xmljsonparser');

const osmAPIServer = {

	dev: {
		url: 'https://master.apis.dev.openstreetmap.org',
		secret: '7JWJ7VX8aSo4pIaQrwoamZ4I2p5dMCTZRbtEGmuS',
		key: 'DE7kW4Be3wDvvRyuG4pMslzQUiBZxYKLioRvD04j'
	},

	// live: {
	// 	url: 'http://www.openstreetmap.org',
	// 	secret: 'uQgAwuulO4TYpi6Dz53zX3eAypxXikg6K7980E9s',
	// 	key: 'Il7VH5O3UYeW1twJuvogfZPUjH6jYAUhjynTNfPw'
	// }
}

const currentEnvironment = osmAPIServer.dev;

const osmAuthConfig = {
	oauth_consumer_key: currentEnvironment.key,
	oauth_secret: currentEnvironment.secret,
	auto: true,
	url: currentEnvironment.url
}


module.exports = class OsmAuth {

	constructor() {

		this.auth = osmAuth(osmAuthConfig);

	}

	xhr(options, cb) {


		return new Promise((resolve, reject) => {
			this.auth.xhr(options, function(err, response) {
				if (err) reject(err);

				if (!response) {
					throw "No response!"
				}
				var xmlText = new XMLSerializer().serializeToString(response);

				var parser = new xmlJsonParser(xmlText);

				parser.toJSON()
					.then(function(parsedjson) {
						resolve(parsedjson);
					})
					.catch(function(err) {
						reject(err);
					})


			})
		})

	}

	isLoggedIn(){
		return this.auth.authenticated();
	}

	getFeature(type, id) {

		var options = {
			method: 'GET',
			// path: '/api/0.6/'+type+'/'+id
			path: '/api/0.6/node/12345'
		}

		return new Promise((resolve, reject) => {
			this.xhr(options)
				.then(function(res) {
					resolve(res);
				}, function(err) {
					reject(err);
				})

		})

	}

	cleanseData(parsedData,featureType) {

		var deleteProps = ['changeset','timestamp','uid','user'];

		deleteProps.forEach(function(prop){
			delete parsedData.osm[featureType][0]['$'][prop];
		})

		return parsedData;
	}

	createChangeset(appliedChanges) {

		var xml = '<osm>\
					  	<changeset>\
					  		<tag k="created_by" v="API 0.6"/>\
					    	<tag k="comment" v="Editing feature tag via Prepare Pokhara app"/>\
					  	</changeset>\
				   </osm>';

		var options = {
			method: 'PUT',
			path: '/api/0.6/changeset/create',
			content: xml,
			options: {
				"header": {
					"Content-Type": "text/xml"
				}

			}
		}

		return new Promise((resolve, reject) => {
			this.auth.xhr(options, function(err, response) {
				if (err) reject(err);
				resolve({
					changeset: response,
					appliedChanges: appliedChanges
				});
			})
		})



	}


	applyChanges(changes, response,featureType) {

		var newtags = [];
		var changes = JSON.parse(JSON.stringify(changes));

		var removeTagsAtIndex = [];

		response.osm[featureType][0].tag.forEach(function(eachtag, index) {
			if (changes[eachtag['$']['k']]) {
				eachtag['$']['v'] = changes[eachtag['$']['k']];
				delete changes[eachtag['$']['k']];
			} else {
				removeTagsAtIndex.push(index);
			}
		})

		removeTagsAtIndex.forEach(function(index) {
			response.osm[featureType][0].tag.splice(index, 1);
		})

		if (Object.keys(changes).length) {
			for (var change in changes) {
				response.osm[featureType][0].tag.push({
					'$': {
						k: change,
						v: changes[change]
					}
				})
			}
		}

		return response;



	}

	applyChangeset(changeset, response,featureType) {

		response.osm[featureType][0]['$'].changeset = changeset;

		var parser = new xmlJsonParser(response);

		return parser.toXML();


	}


	applyEdit(xml,type,id) {

		var options = {
			method: 'PUT',
			path: '/api/0.6/node/12345',
			// path: '/api/0.6/'+type+'/'+id,
			content: xml,
			options: {
				"header": {
					"Content-Type": "text/xml"
				}

			}
		}

		return new Promise((resolve, reject) => {
			this.auth.xhr(options, function(err, response) {
				if (err) reject(err);
				resolve(response)
			})
		})



	}



}

// test codes 



// var changes = {
//     "natural" : "yes",
//     "amenity" : "tree",
// }

// var auth = new osmAuth();

// auth.getFeature(d.properties.type,d.properties.id)
//     .then(function(response){

//         response = auth.cleanseData(response);
        
        
//         var appliedChanges =  auth.applyChanges(changes,response);

//         return auth.createChangeset(appliedChanges);

//     },function(err){
//         throw err;
//     })
//     .then(function(response){
//         var xml = auth.applyChangeset(response.changeset,response.appliedChanges);
//         return auth.applyEdit(xml);

//     },function(err){
//         throw err;
//     })
//     .then(function(edited){
//         console.log('WAS EDITED?',edited)
//     },function(err){
//         throw err;
//     })
//     .catch(function(err){
//         throw err;
//     })