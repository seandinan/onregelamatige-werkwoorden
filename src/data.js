const formatData = (infinitief, ovtEnk, ovtMv, vd, eng) => ({infinitief, ovtEnk, ovtMv, vd, eng});

const data = [
	formatData('aankomen', 'kwam aan', 'kwamen aan', 'zijn aangekomen', 'to come'),
	formatData('aandoen', 'deed aan', 'deden aan', 'hebben aangedaan', 'to come'),
	formatData('aannemen', 'nam aan', 'namen aan', 'aangenomen', 'to come')
]

export default data;
