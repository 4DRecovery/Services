#install-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.install-popup {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 350px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.install-popup h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.install-popup p {
    font-size: 16px;
    margin-bottom: 15px;
}

.install-popup button {
    background: #00d1b2;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
}

.install-popup button:hover {
    background: #00a896;
}

#dismiss-btn {
    background: #ccc;
}

#dismiss-btn:hover {
    background: #999;
}
