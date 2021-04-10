import React, {useState, useEffect, useLayoutEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuoteBox() {
  const [quotesStorage, setQuotesStorage] = useState({});
  const [quoteSelected, setQuoteSelected] = useState({});
  const classes = useStyles();

  useEffect(() => {
    getQuotes();
  }, [])
  const getQuotes = async () => {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    const data = await response.json();
    setQuotesStorage(data)
    setQuoteSelected(data.quotes[getRandomIndex(data.quotes.length)])
  }
  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const selectQuote = () =>{
    setQuoteSelected(quotesStorage.quotes[getRandomIndex(quotesStorage.quotes.length)]);
  }

  return (
    <Card id="quote-box" className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Quote of the Day
        </Typography>
        <Typography id="text" variant="h5" component="h2">
          {quoteSelected.quote}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          by
        </Typography>
        <Typography id="author" variant="body2" component="p">
            {quoteSelected.author}
        </Typography>
      </CardContent>
      <CardActions>
      <Button id="new-quote" size="small" onClick={() => selectQuote()}>See another Quote</Button>
      <Button id="tweet-quote" variant="contained" color="primary" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quoteSelected.quote + '" ' + quoteSelected.author)}>
        Tweet
      </Button>
        
      </CardActions>
    </Card>
  );
}