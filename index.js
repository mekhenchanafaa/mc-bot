{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 LucidaGrande;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const mineflayer = require('mineflayer')\
const \{ pathfinder, Movements, goals \} = require('mineflayer-pathfinder')\
\
const bot = mineflayer.createBot(\{\
  host: 'nounou256.aternos.me', // change if needed\
  port: 25565, // change if your server has a custom port\
  username: 'NounouBot',\
  auth: 'offline'\
\})\
\
bot.loadPlugin(pathfinder)\
\
bot.once('spawn', () => \{\
  console.log('Bot joined!')\
\
  const defaultMove = new Movements(bot)\
  bot.pathfinder.setMovements(defaultMove)\
\
  startRandomBehavior()\
\})\
\
function randomDelay() \{\
  return Math.floor(Math.random() * 8000) + 2000 // 2s 
\f1 \uc0\u8594 
\f0  10s\
\}\
\
function startRandomBehavior() \{\
  setInterval(async () => \{\
    const action = Math.floor(Math.random() * 4)\
\
    try \{\
      switch (action) \{\
\
        case 0:\
          await randomWalk()\
          break\
\
        case 1:\
          await randomLook()\
          break\
\
        case 2:\
          await digBlock()\
          break\
\
        case 3:\
          await placeBlock()\
          break\
      \}\
    \} catch (err) \{\
      console.log('Action error:', err.message)\
    \}\
\
  \}, randomDelay())\
\}\
\
async function randomWalk() \{\
  const x = bot.entity.position.x + (Math.random() * 10 - 5)\
  const z = bot.entity.position.z + (Math.random() * 10 - 5)\
  const y = bot.entity.position.y\
\
  console.log('Walking somewhere...')\
\
  const goal = new goals.GoalBlock(x, y, z)\
  bot.pathfinder.setGoal(goal)\
\
  await sleep(3000)\
  bot.pathfinder.setGoal(null)\
\}\
\
async function randomLook() \{\
  const yaw = Math.random() * Math.PI * 2\
  const pitch = (Math.random() - 0.5) * Math.PI\
\
  console.log('Looking around...')\
  bot.look(yaw, pitch, true)\
\}\
\
async function digBlock() \{\
  const block = bot.blockAt(bot.entity.position.offset(0, -1, 0))\
\
  if (!block || block.name === 'air') return\
\
  console.log('Digging block...')\
  await bot.dig(block)\
\}\
\
async function placeBlock() \{\
  const block = bot.blockAt(bot.entity.position.offset(0, -1, 0))\
\
  if (!block) return\
\
  const item = bot.inventory.items()[0]\
  if (!item) return\
\
  console.log('Placing block...')\
\
  await bot.equip(item, 'hand')\
  await bot.placeBlock(block, \{ x: 0, y: 1, z: 0 \})\
\}\
\
function sleep(ms) \{\
  return new Promise(resolve => setTimeout(resolve, ms))\
\}}