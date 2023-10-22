let fr = 10


function frozen(n, side) {
    fill(39, 229, 232, 100);
    rect((n - side) / 2, (n - side) / 2, n * side, n * side);
    frameRate(1);
}


function draw() {
    frameRate(fr)

    if (keyIsDown(UP_ARROW)) {
        frozen(n, side)
    }
}