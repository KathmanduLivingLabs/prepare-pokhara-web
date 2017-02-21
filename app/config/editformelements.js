module.exports = {

	'amenities': {

		'hospitals': {

			'fields': [

				{
					'tag': ['name'],
					'readable': 'Name',
					'type': 'text',
					'required' : true
				},

				{
					'tag': ['name:ne'],
					'readable': 'Name(Nepali)',
					'type': 'text'
				},

				{
					'tag': ['facility:icu'],
					'readable': 'ICU',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['facility:ventilator'],
					'readable': 'Ventilator',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['emergency:services','emergency_service'],
					'readable': 'Emergency Services',
					'type': 'text'
				},

				{
					'tag': ['facility:operation_theatre', 'facility:operating_theatre'],
					'readable': 'Operation Theatre',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['facility:nicu'],
					'readable': 'NICU',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['emergency'],
					'readable': 'Emergency',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['facility:x-ray'],
					'readable': 'X-ray',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				},

				{
					'tag': ['capacity:beds', 'capacity:bed'],
					'readable': 'Bed Capacity',
					'type': 'number'
				},

				{
					'tag': ['personnel:count'],
					'readable': 'Personnel Count',
					'type': 'number'
				}

			]
		},

		'schools': {

			'fields': [

				{
					'tag': ['name'],
					'readable': 'Name',
					'type': 'text',
					'required' : true
				}, {
					'tag': ['name:ne'],
					'readable': 'Name(Nepali)',
					'type': 'text'
				},

				{
					'tag': ['operator:type', 'operator'],
					'readable': 'Operator Type',
					'type': 'dropdown',
					'options': ['Private', 'Government', 'Community']
				},

				{
					'tag': ['student:count'],
					'readable': 'Student Count',
					'type': 'number'
				},

				{
					'tag': ['personnel:count'],
					'readable': 'Personnel Count',
					'type': 'number'
				}
			]

		},

		'banks': {

			'fields': [


				{
					'tag': ['name'],
					'readable': 'Name',
					'type': 'text',
					'required' : true
				},


				{
					'tag': ['operator'],
					'readable': 'Operator',
					'type': 'text'
				},

				{
					'tag': ['atm'],
					'readable': 'ATM',
					'type': 'dropdown',
					'options': ['Yes', 'No']
				}

			]
		}
	}

}