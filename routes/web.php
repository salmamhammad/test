<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/','App\Http\Controllers\CDocumentController@index')->name('/');
Route::post('/document/edit','App\Http\Controllers\CDocumentController@editDocument')->name('editDocument');
Route::get('/document/delete/{id}','App\Http\Controllers\CDocumentController@delDocument')->name('delDocument');

