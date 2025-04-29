
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'dev-secret',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('');
});

app.get('/admin', (req, res) => {
  res.render('login', { error: null });
});

app.post('/admin', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'admin') {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) return res.redirect('/admin');

  const stats = {
    users: 1204,
    revenue: 5320,
    activeSubs: 827
  };

  res.render('dashboard', { stats });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin');
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
