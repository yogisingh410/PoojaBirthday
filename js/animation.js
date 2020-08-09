"use strict";

$(function ($) {
    if (Modernizr.canvas) {
        var numParticles = 300;
        var width  = window.innerWidth;
        var height = window.innerHeight;
        var p = new Processing(document.getElementById("hearts"));
        var startedAt = new Date();
        var play = true;
        var components = [];

        // universe
        var pixels = [];
        for (var i = 0; i < numParticles; i++ ) {
            pixels[i] = {
                x : Math.random() * width,
                y : Math.random() * height,
                toX : Math.random() * width,
                toY : Math.random() * height,
                angle : Math.random() * Math.PI * 3,
                size : 10,
                toSize : Math.random() * 10,
                r : 0,
                g : 0,
                b : 0,
                toR : Math.random() * 255,
                toG : 0,
                toB : 0,
                flightMode : 0
            };
            pixels[i].toX = pixels[i].x;
            pixels[i].speedX = 0;
            pixels[i].speedY = 0;
        }

        var transitions = [
        // random position
        function() {
            for (var i = 0; i < pixels.length; i++ ) {
                var p = pixels[i];
                p.toX = Math.random() * width;
                p.toY = Math.random() * height;
                p.speedX = Math.cos(p.angle) * Math.random() * 3;
                p.speedY = Math.sin(p.angle) * Math.random() * 3;
            }
        },
        // change size
        function() {
            for (i = 0; i < pixels.length; i++ ) {
                var p = pixels[i];
                p.toSize = Math.random() * 20 + 1;
            }
        },
        // heart
        function() {
            // Add some slight randomness to the position. Don't always want it dead center
            var xRandom = Math.floor(Math.random() * (800 - 600 + 1) + 600);
            var yRandom = Math.floor(Math.random() * (500 - 300 + 1) + 300);

            var heart = [[707, 359], [707, 359], [707, 359], [707, 359], [708, 358], [711, 354], [713, 352], [714, 348], [716, 345], [720, 335], [721, 334], [722, 333], [724, 332], [725, 330], [727, 327], [731, 322], [734, 320], [737, 318], [740, 314], [743, 312], [745, 311], [749, 309], [753, 308], [757, 306], [761, 303], [764, 302], [767, 302], [771, 301], [774, 301], [778, 301], [783, 301], [786, 301], [790, 300], [796, 300], [801, 300], [805, 300], [809, 300], [811, 300], [815, 302], [817, 303], [820, 305], [822, 306], [824, 307], [827, 309], [830, 311], [834, 313], [836, 314], [838, 316], [841, 318], [844, 321], [845, 324], [847, 326], [849, 328], [852, 332], [853, 334], [855, 336], [857, 337], [858, 339], [860, 341], [862, 345], [863, 349], [863, 352], [864, 356], [864, 359], [865, 362], [866, 364], [868, 368], [869, 372], [870, 377], [871, 381], [872, 384], [872, 388], [872, 392], [872, 395], [872, 399], [872, 401], [872, 405], [872, 409], [871, 412], [870, 417], [869, 419], [869, 422], [867, 427], [866, 429], [865, 434], [863, 438], [862, 442], [861, 443], [860, 445], [857, 448], [854, 451], [852, 454], [849, 456], [846, 459], [843, 460], [836, 466], [835, 466], [833, 467], [821, 475], [820, 477], [819, 478], [817, 481], [815, 483], [811, 486], [808, 487], [803, 491], [802, 491], [800, 492], [795, 493], [791, 497], [789, 498], [786, 498], [780, 502], [772, 507], [770, 510], [767, 511], [762, 516], [758, 520], [756, 524], [753, 527], [750, 529], [746, 532], [741, 534], [736, 537], [732, 538], [731, 539], [735, 537], [735, 537], [735, 537], [730, 543], [729, 546], [727, 551], [726, 553], [723, 555], [721, 558], [715, 568], [714, 570], [714, 572], [713, 575], [708, 585], [708, 586], [707, 586], [704, 583], [704, 359], [704, 359], [700, 356], [698, 352], [697, 350], [696, 345], [694, 343], [693, 340], [690, 335], [688, 335], [687, 334], [683, 332], [681, 329], [677, 326], [675, 323], [672, 319], [669, 314], [668, 312], [663, 310], [660, 310], [656, 310], [653, 309], [647, 309], [644, 308], [642, 308], [637, 307], [632, 303], [628, 301], [624, 297], [621, 297], [619, 297], [616, 297], [616, 298], [616, 299], [614, 300], [620, 302], [620, 302], [620, 302], [618, 302], [612, 302], [605, 302], [598, 302], [596, 303], [594, 305], [592, 307], [590, 309], [586, 310], [583, 313], [582, 315], [579, 319], [576, 320], [573, 323], [571, 325], [569, 327], [563, 329], [560, 333], [558, 336], [557, 338], [556, 341], [555, 343], [551, 346], [549, 349], [549, 354], [549, 357], [547, 361], [546, 367], [543, 372], [542, 375], [541, 380], [540, 381], [540, 382], [540, 382], [540, 382], [540, 382], [540, 384], [540, 386], [540, 389], [539, 391], [539, 394], [539, 398], [539, 404], [539, 408], [539, 412], [539, 416], [540, 423], [542, 428], [544, 433], [549, 436], [552, 439], [555, 442], [557, 445], [560, 448], [562, 452], [564, 459], [565, 461], [560, 449], [560, 449], [561, 450], [571, 458], [580, 466], [584, 469], [587, 473], [589, 476], [591, 477], [575, 466], [575, 466], [575, 466], [576, 466], [582, 471], [587, 475], [590, 477], [594, 481], [598, 484], [601, 489], [604, 491], [607, 495], [611, 496], [617, 498], [622, 500], [626, 501], [629, 504], [633, 508], [636, 510], [642, 515], [650, 522], [651, 525], [655, 528], [657, 529], [660, 530], [663, 530], [667, 533], [671, 534], [676, 536], [679, 537], [681, 539], [683, 540], [676, 536], [676, 536], [676, 536], [679, 539], [684, 546], [687, 548], [689, 551], [692, 554], [696, 558], [698, 563], [701, 567], [702, 571], [704, 574], [705, 577], [706, 579], [707, 580], [708, 582], [709, 586]];
            for (i = 0; i < pixels.length; i++ ) {
                var p = pixels[i];

                // Turn hard coded pixel positions into positions based on screen height and width
                // Veritcally & horizontally centered... roughly
                var relativeX = (width / 2) + (xRandom - heart[Math.floor(i) % heart.length][0]);
                var relativeY = (height / 2) - (yRandom - heart[Math.floor(i) % heart.length][1]);

                p.toX = relativeX % width;
                p.toY = relativeY % height;

                p.speedX = (Math.random() - 0.5) / 2;
                p.speedY = (Math.random() - 0.5) / 2;
            }
        }
        ];

        var Universe = function Pixels() {
            return {
                framecount : 0,

                update: function () {
                    // move to tox
                    for (i = 0; i < pixels.length; i++ ) {
                        pixels[i].x = pixels[i].x + (pixels[i].toX - pixels[i].x) / 10;
                        pixels[i].y = pixels[i].y + (pixels[i].toY - pixels[i].y) / 10;
                        pixels[i].size = pixels[i].size + (pixels[i].toSize - pixels[i].size) / 10;

                        pixels[i].r = pixels[i].r + (pixels[i].toR - pixels[i].r) / 10;
                        pixels[i].g = pixels[i].g + (pixels[i].toG - pixels[i].g) / 10;
                        pixels[i].b = pixels[i].b + (pixels[i].toB - pixels[i].b) / 10;
                    }

                    // update speed
                    for (i = 0; i < pixels.length; i++ ) {
                        // check for flightmode
                        var a = Math.abs(pixels[i].toX) * Math.abs(pixels[i].toX);
                        var b = Math.abs(pixels[i].toY) * Math.abs(pixels[i].toY);
                        var c = Math.sqrt(a + b);

                        if (c < 120) {
                            if (pixels[i].flightMode == 0) {
                                var alpha = Math.atan2(pixels[i].y, pixels[i].x) * 180 / Math.PI + Math.random() * 180-90;
                                pixels[i].degree = alpha;
                                pixels[i].degreeSpeed = Math.random() * 1 + 0.5;
                                pixels[i].frame = 0;
                            }
                            pixels[i].flightMode = 1;
                        } else {
                            pixels[i].flightMode = 0;
                        }

                        // random movement
                        if (pixels[i].flightMode == 0) {
                            // change position
                            pixels[i].toX += pixels[i].speedX;
                            pixels[i].toY += pixels[i].speedY;

                            // check for bounds
                            if (pixels[i].x < 0) {
                                pixels[i].x = width;
                                pixels[i].toX = width;
                            }
                            if (pixels[i].x > width) {
                                pixels[i].x = 0;
                                pixels[i].toX = 0;
                            }

                            if (pixels[i].y < 0) {
                                pixels[i].y = height;
                                pixels[i].toY = height;
                            }
                            if (pixels[i].y > height) {
                                pixels[i].y = 0;
                                pixels[i].toY = 0;
                            }
                        }
                    }

                    // set a coord
                    var r1 = Math.floor(Math.random() * pixels.length);
                    var r2 = Math.floor(Math.random() * pixels.length);

                    pixels[r1].size = Math.random() * 30;
                    pixels[r2].size = Math.random() * 30;

                    this.framecount++;

                    var now = new Date();

                    // Change animation every 1.5 seconds
                    if (now.getTime() - startedAt.getTime() > 1500) {
                        startedAt = now;

                        var transIndex = Math.floor(Math.random() * transitions.length);
                        transitions[transIndex]();
                    }

                },
                draw: function () {
                    // Draw the small heart shapes
                    for (i = 0; i < pixels.length; i++ ) {
                        var x = pixels[i].x;
                        var y = pixels[i].y;
                        var sz = pixels[i].size;
                        var proportion = 2;

                        p.beginShape();
                        p.fill(Math.floor(pixels[i].r), Math.floor(pixels[i].g), Math.floor(pixels[i].b));
                        p.stroke(Math.floor(pixels[i].r), Math.floor(pixels[i].g), Math.floor(pixels[i].b));
                        p.vertex(x, y);
                        p.bezierVertex(x, y-sz/2, x+proportion*sz, y-sz/2, x, y+sz);
                        p.vertex(x, y);
                        p.bezierVertex(x, y-sz/2, x-proportion*sz, y-sz/2, x, y+sz);
                        p.endShape();
                    }
                }
            }
        };

        components.push(new Universe());

        // Animation of the hearts around the screen
        p.draw = function() {
            for (var i = 0; i < components.length; i++) {
                components[i].update();
            }
            p.background( 0 );
            for (var i = 0; i < components.length; i++) {
                components[i].draw();
            }
        }

        p.size(width, height);
        p.frameRate( 60 );
        p.loop();
    }
});

