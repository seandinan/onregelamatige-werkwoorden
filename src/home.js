import React from 'react';
import styled, { css } from 'styled-components';
import Vocab from './data';

const Container = styled.div`
box-sizing: border-box;
 	display: flex;
 	flex-flow: column;
 	justify-content: flex-start;
 	align-items: center;
 	padding: 5%;
 	width: 100%;
`
const Title = styled.div`
	width: 100%;
	text-align: center;
	font-size: 5em;
	color: hsl(215, 60%, 55%);
`
const Wrapper = styled.div`
	padding: 15px;
	width: 90%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
`
const Label = styled.span`
	font-size: 1.5em;
	color: hsl(0, 0%, 30%);
	border-bottom: 2px solid hsl(0, 0%, 80%);
	padding: 5px;
	flex-grow: 1;
`
const Input = styled.input`
	outline: none;
	border: none;
	border-bottom: 2px solid hsl(0, 0%, 80%);
	flex-grow: 2;
	padding: 5px 5px 5px 15px;
	font-size: 2em;
	color: hsl(0, 0%, 60%);
	border-radius: 0;
	margin: 0;
	${props => props.isError && css`text-decoration: line-through`}
`
const Button = styled.button`
	outline: none;
	border: 1px solid hsl(0, 0%, 70%);
	color: hsl(0, 0%, 40%);
	border-radius: 5px;
	padding: 10px;
	font-size: 2em;
	background-color: white;
	margin-top: 10px;
	cursor: pointer;
	width: 100%;
	
	${props => props.disabled && css`
		background-color: hsl(0, 0%, 97%);
		color: hsl(0, 0%, 80%);
		border-color: hsl(0, 0%, 90%);
		cursor: not-allowed;
	`}
`
const Correction = styled.span`
	font-size: 1.5em;
	flex-grow: 1;
	color: hsl(0, 70%, 60%);
	font-style: italic;
	border-bottom: 2px solid hsl(0, 0%, 80%);
	padding: 5px;
`
class Home extends React.Component {
  constructor(props){
    super(props);
    this.startingInput;
    this.state = {
    	eng: '',
	    ovtEnk: '',
	    ovtMv: '',
	    vd: '',
	    errors: [],
	    vocab: [],
	    currentVocabIndex: 0,
	    currentStreak: 0,
    };
  }

  componentWillMount(){
  	this.generateShuffledVocab();
  }

  componentDidMount(){
	  window.addEventListener('keyup', (e) => {
		  if (e.key === 'Enter') this.handleCheck();
	  })
  }

  generateShuffledVocab = () => {
	  // via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
	  let result = Vocab;
	  let currentIndex = result.length;
	  let tempValue, randomIndex;
	  while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  tempValue = result[currentIndex];
		  result[currentIndex] = result[randomIndex];
		  result[randomIndex] = tempValue;
		  }

	  this.setState({ vocab: result, errors: [], currentVocabIndex: 0 });
	  if (this.startingInput) this.startingInput.focus();
	  this.clearWords();
  }

  handleCheck = () => {
	  const { eng, ovtEnk, ovtMv, vd, vocab, currentVocabIndex } = this.state;
	  let errors = [];
	  let word = vocab[currentVocabIndex];
	  if (eng.toLowerCase() !== word.eng) errors.push('eng');
	  if (ovtEnk.toLowerCase() !== word.ovtEnk) errors.push('ovtEnk');
	  if (ovtMv.toLowerCase() !== word.ovtMv) errors.push('ovtMv');
	  if (vd.toLowerCase() !== word.vd) errors.push('vd');

	  if (errors.length > 0) this.setState({ errors, currentStreak: 0 });
	  else if (currentVocabIndex === vocab.length - 1){
	  	this.setState({ currentStreak: this.state.currentStreak + 1 });
	  	this.generateShuffledVocab();
	  	console.log('Proficiat!');
	  } else {
	  	this.setState({ currentVocabIndex: currentVocabIndex + 1, errors: [], currentStreak: this.state.currentStreak + 1 });
	  	if (this.startingInput) this.startingInput.focus();
	  	this.clearWords();
	  }
  }

  clearWords = () => this.setState({ eng: '', ovtEnk: '', ovtMv: '', vd: '' });

  handleUpdate = (e) => {
  	this.setState({[e.target.name]: e.target.value});
  }

  render(){
  	const { eng, ovtEnk, ovtMv, vd, errors, vocab, currentVocabIndex } = this.state;
  	const word = vocab[currentVocabIndex];

    return (
      <Container>
        <Title>{word.infinitief}</Title>
	      <Wrapper>
		      <Label>Engels:</Label>
		      {errors.indexOf('eng') !== -1 ? <Correction>{`(${word.eng})`}</Correction> : null}
		      <Input innerRef={ref => this.startingInput = ref} name="eng" isErr={errors.indexOf('eng') !== -1} value={eng} onChange={this.handleUpdate} type="text"/>
	      </Wrapper>
				<Wrapper>
					<Label>OVT (enk.):</Label>
					{errors.indexOf('ovtEnk') !== -1 ? <Correction>{`(${word.ovtEnk})`}</Correction> : null}
					<Input name="ovtEnk" isErr={errors.indexOf('ovtEnk') !== -1} value={ovtEnk} onChange={this.handleUpdate} type="text"/>
				</Wrapper>
	      <Wrapper>
		      <Label>OVT (mv.):</Label>
		      {errors.indexOf('ovtMv') !== -1 ? <Correction>{`(${word.ovtMv})`}</Correction> : null}
		      <Input name="ovtMv" isErr={errors.indexOf('ovtMv') !== -1} value={ovtMv} onChange={this.handleUpdate} type="text"/>
	      </Wrapper>
	      <Wrapper>
		      <Label>VD:</Label>
		      {errors.indexOf('vd') !== -1 ? <Correction>{`(${word.vd})`}</Correction> : null}
		      <Input name="vd" isErr={errors.indexOf('vd') !== -1} value={vd} onChange={this.handleUpdate} type="text"/>
	      </Wrapper>
	      <Button onClick={this.handleCheck}>Submit</Button>
	      <Button onClick={this.generateShuffledVocab}>Reshuffle</Button>
	      <Label style={{fontStyle: 'italic', borderBottom: 'none', marginTop: '15px'}}>Streak: {this.state.currentStreak}</Label>
      </Container>
    )
  }
}

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
