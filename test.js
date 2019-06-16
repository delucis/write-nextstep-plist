import path from 'path'
import fs from 'fs'
import test from 'ava'
import tempfile from 'tempfile'
import writePlist from '.'

test('async', async t => {
  const tmp = path.join(tempfile(), 'foo')
  await writePlist(tmp, { foo: true })
  t.is(fs.readFileSync(tmp, 'utf8'), '{ "foo" = "true"; }\n')
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo')
  writePlist.sync(tmp, { foo: true }, { detectIndent: true, indent: 2 })
  t.is(fs.readFileSync(tmp, 'utf8'), '{ "foo" = "true"; }\n')
})

test('write arrays', async t => {
  const tmp = path.join(tempfile(), 'foo')
  await writePlist(tmp, { foo: [1, 5] })
  t.is(fs.readFileSync(tmp, 'utf8'), '{ "foo" = ( "1", "5" ); }\n')
})

test('write objects', async t => {
  const tmp = path.join(tempfile(), 'foo')
  await writePlist(tmp, { foo: {}, bar: { baz: [] } })
  t.is(fs.readFileSync(tmp, 'utf8'), '{ "foo" = { }; "bar" = { "baz" = (  ); }; }\n')
})

test('throws if filepath is empty (async)', async t => {
  await t.throwsAsync(async () => writePlist(''))
})

test('throws if filepath is empty (sync)', t => {
  t.throws(() => writePlist.sync(''))
})

test('throws if no data provided (async)', async t => {
  const tmp = path.join(tempfile(), 'foo')
  await t.throwsAsync(async () => writePlist(tmp))
})

test('throws if no data provided (sync)', t => {
  const tmp = path.join(tempfile(), 'foo')
  t.throws(() => writePlist.sync(tmp))
})
