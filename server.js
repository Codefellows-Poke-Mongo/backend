'use strict'

require('dotenv').config();

const cors = require('cors');
const express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

app.use(express.json());

