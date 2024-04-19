<?php
// Define the path to your MP3 files
$mp3FilePath = '../music/stimrosetta/';

// Get the requested file name from the query string
$requestedFile = $_GET['file'];

// Validate the file name to prevent directory traversal
$requestedFile = basename($requestedFile);

// Set the appropriate content headers
header("Content-Type: audio/mpeg");
header("Content-Length: " . filesize($mp3FilePath . $requestedFile));

// Read the file and output its contents
readfile($mp3FilePath . $requestedFile);
?>